import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router';
import { server } from './setup';
import { http, HttpResponse } from 'msw';
import { mockUserInput } from '../test-utils/mockUserInput';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import {
  TEST_FETCH_URL,
  TEST_SEARCH_URL,
  TEST_SEARCH_INPUTS,
  TEST_SEARCH_PARAMS,
} from '@/test-utils/testCostants';

describe('App -- when data is cached', () => {
  test('should not make extra requests if with same input', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(window, 'fetch');
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    const searchButton = screen.getByRole('button', {
      name: 'Find Cards',
    });
    await user.click(searchButton);
    await user.click(searchButton);
    await user.click(searchButton);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });
  test('should not fetch cached card lists and should invalidate with clear button ', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(window, 'fetch');
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    const firstSearch = TEST_SEARCH_INPUTS.EMPTY;
    const secondSearch = TEST_SEARCH_INPUTS.VALID;
    const clearCacheButton = await screen.findByRole('button', {
      name: 'Clear Card List Cache',
    });

    const interactions: [string, HTMLElement | string, number, string][] = [
      ['input', secondSearch, 2, 'fetch'],
      ['input', firstSearch, 2, 'fetch'],
      ['input', secondSearch, 2, 'cache'],
      ['input', firstSearch, 2, 'cache'],
      ['clear', clearCacheButton, 3, 'refetch on clear'],
      ['input', secondSearch, 4, 'new fetch'],
    ];

    for (const [action, element, expectedCalls] of interactions) {
      if (action === 'input') {
        await mockUserInput(user, element as string);
      }
      if (action === 'clear') {
        await user.click(clearCacheButton);
      }
      await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalledTimes(expectedCalls);
      });
    }
  });

  test('should not fetch cached details and should invalidate with clear button ', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(window, 'fetch');
    render(
      <MemoryRouter
        initialEntries={[`${TEST_SEARCH_URL}${TEST_SEARCH_PARAMS.VALID}`]}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    const firstCard = await screen.findByRole('img', {
      name: /Image of Black Lotus/i,
    });
    const secondCard = await screen.findByRole('img', {
      name: /Image of Blacker Lotus/i,
    });
    const clearCacheButton = await screen.findByRole('button', {
      name: /Clear Details Cache/i,
    });

    const interactions: [HTMLElement, number, string][] = [
      [firstCard, 2, 'fetch'],
      [secondCard, 3, 'fetch'],
      [firstCard, 3, 'cache'],
      [secondCard, 3, 'cache'],
      [clearCacheButton, 4, 'refetch on clear'],
      [firstCard, 5, 'new fetch'],
    ];

    for (const [element, expectedCalls] of interactions) {
      await user.click(element);
      await waitFor(() =>
        expect(fetchSpy).toHaveBeenCalledTimes(expectedCalls)
      );
    }
  });
});

describe('App/SearchBar/SearchResults -- when user search in SearchBar', () => {
  test.each([
    {
      term: TEST_SEARCH_INPUTS.EMPTY,
      status: 'Card List',
      expectedItems: 5,
    },
    {
      term: TEST_SEARCH_INPUTS.VALID,
      status: 'Card List',
      expectedItems: 3,
    },
    {
      term: TEST_SEARCH_INPUTS.INVALID,
      status: 'No Cards Found With That Name',
      expectedItems: 0,
    },
  ])(
    'should find in SearchResults $expectedItems items with $term and show $status',
    async ({ term, status, expectedItems }) => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(term);
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
      await mockUserInput(user, term);
      await waitFor(() => {
        const cardImage = screen.queryAllByRole('img', {
          name: /Image of/i,
        });
        expect(cardImage).toHaveLength(expectedItems);
      });
      const statusBar = await screen.findByRole('heading', {
        level: 1,
        name: status,
      });
      expect(statusBar).toBeInTheDocument();
      localStorage.clear();
      vi.restoreAllMocks();
      cleanup();
    }
  );
  test('should on unexpected error show message', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(TEST_FETCH_URL, () => {
        return HttpResponse.error();
      })
    );
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    await mockUserInput(user, '');
    const searchButton = screen.getByRole('button', {
      name: 'Find Cards',
    });
    await user.click(searchButton);
    const unexpectedStatus = await screen.findByText('Something Went Wrong');
    expect(unexpectedStatus).toBeInTheDocument();
  });
});

describe('App/Navigation/CardItem -- when add card to cart', async () => {
  test('should update cart item counter when not items and add items', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const noCart = screen.queryByText(/Selected/i);
    expect(noCart).toBe(null);

    const card1 = await screen.findByRole('img', {
      name: /Image of Aang, Airbending Master Card/i,
    });
    const card1SelectButton = card1.nextSibling as Element;
    await user.click(card1SelectButton);
    const cartCart = await screen.findByText(/Selected/i);
    expect(cartCart).toHaveTextContent('Selected 1');

    const card2 = await screen.findByRole('img', {
      name: /Aang, Air Nomad/i,
    });
    const card2SelectButton = card2.nextSibling as Element;
    await user.click(card2SelectButton);
    const updatedCart = await screen.findByText(/Selected/i);
    expect(updatedCart).toHaveTextContent('Selected 2');
  });
  test('should clear cart when deselect', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const card = await screen.findByRole('img', {
      name: /Image of Aang, Airbending Master Card/i,
    });
    const cardSelectButton = card.nextSibling as Element;
    await user.click(cardSelectButton);
    const cart = await screen.findByText(/Selected/i);
    expect(cart).toHaveTextContent('Selected 1');

    const deselectButton = await screen.findByText('Deselect All');
    await user.click(deselectButton);
    const emptyCart = screen.queryByText(/Selected/i);
    expect(emptyCart).toBe(null);
  });
  test('should persist selected items when changing routes', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const card = await screen.findByRole('img', {
      name: /Image of Aang, Airbending Master Card/i,
    });
    const cardSelectButton = card.nextSibling as Element;
    await user.click(cardSelectButton);

    const toAboutButton = await screen.findByRole('link', { name: 'About' });
    await user.click(toAboutButton);
    const toSearchButton = await screen.findByRole('link', { name: 'Search' });
    await user.click(toSearchButton);

    const refetchedCard = await screen.findByRole('img', {
      name: /Image of Aang, Airbending Master Card/i,
    });
    const refetchedSelectButton = refetchedCard.nextSibling as Element;
    expect(refetchedSelectButton).not.toBe(cardSelectButton);
    expect(refetchedSelectButton).toHaveClass('shadow-[inset_0_0_0_2px]');
  });
});

describe('App/ThemeProvider -- when changing theme', () => {
  test('should toggle theme when on toggle button', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    const initialTheme = document.querySelectorAll('[class*="light:"]');
    expect(initialTheme.length).toBeLessThan(6);

    const themeButton = await screen.findByLabelText('Change Theme');
    await user.click(themeButton);

    await waitFor(() => {
      const initialTheme = document.querySelectorAll('[class*="light:"]');
      expect(initialTheme.length).toBeGreaterThan(6);
    });
  });
});
