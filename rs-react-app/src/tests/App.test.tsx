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

describe('SearchBar/SearchResults -- when initial load', () => {
  test('should check local storage for search term', () => {
    const storageGetSpy = vi.spyOn(Storage.prototype, 'getItem');
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(storageGetSpy).toHaveBeenCalledWith('RecentSearch');
  });
  test('should contain local storage search term as input value', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('Lotus');
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const searchBar = await screen.findByRole('searchbox');
    expect(searchBar).toHaveValue('Lotus');
  });

  test.each([
    { name: 'default term', term: '', status: 'Card List', expectedItems: 5 },
    {
      name: 'valid term',
      term: 'Lotus',
      status: 'Card List',
      expectedItems: 3,
    },
    {
      name: 'invalid 404 term',
      term: '12345678',
      status: 'No Cards Found With That Name',
      expectedItems: 0,
    },
    {
      name: 'have no term',
      term: null,
      status: 'Card List',
      expectedItems: 5,
    },
  ])(
    'should render $expectedItems items when $name in local storage and show $status status',
    async ({ term, status, expectedItems }) => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(term);
      render(
        <MemoryRouter initialEntries={['/search/cards']}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
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
});

describe('SearchBar/SearchResults -- when user search', () => {
  test('should not make extra requests if search term remains the same', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(window, 'fetch');
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    const searchButton = screen.getByRole('button', {
      name: 'Find Cards',
    });
    await user.click(searchButton);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });
  test('should write trimmed search term into storage', async () => {
    const user = userEvent.setup();
    const storageSetSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    await mockUserInput(user, '        Lotus');
    expect(storageSetSpy).toHaveBeenCalledWith('RecentSearch', 'Lotus');
  });
  test.each([
    { name: 'no term', term: '', status: 'Card List', expectedItems: 5 },
    {
      name: 'valid term',
      term: 'Lotus',
      status: 'Card List',
      expectedItems: 3,
    },
    {
      name: 'invalid 404 term',
      term: '12345678',
      status: 'No Cards Found With That Name',
      expectedItems: 0,
    },
  ])(
    'should find $expectedItems items with $name and show $status status',
    async ({ term, status, expectedItems }) => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(term);
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={['/search/cards']}>
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
});

describe('SearchResults -- when unexpected server error', () => {
  test('should have readable error status', async () => {
    const user = userEvent.setup();
    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        return HttpResponse.error();
      })
    );
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
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

describe('SearchResults -- when loading', () => {
  test('should disable UI', async () => {
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const searchBar = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', {
      name: 'Find Cards',
    });
    expect(searchButton).toBeDisabled();
    expect(searchBar).toBeDisabled();
    await waitFor(() => {
      const searchBarAfter = screen.getByRole('searchbox');
      const searchButtonAfter = screen.getByRole('button', {
        name: 'Find Cards',
      });
      expect(searchButtonAfter).toBeEnabled();
      expect(searchBarAfter).toBeEnabled();
    });
  });
  test('should show loading spinner ', async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const loading = await screen.findAllByText(/⟡/);
    expect(loading).toHaveLength(2);
    
    await delay(2000);

    const loadingAfter = screen.queryAllByText(/⟡/);
    expect(loadingAfter).toHaveLength(0);
  });
});

describe('Navigation/CardItem -- when add card to cart', async () => {
  test('should update cart item counter when not items and add items', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search/cards?q=&page=1']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const fetchSpy = vi.spyOn(window, 'fetch');

    console.error('Fetch called with:', fetchSpy.mock.calls);

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
      <MemoryRouter initialEntries={['/search/cards?q=&page=1']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const card = await screen.findByRole('img', {
      name: /Image of Aang, Airbending Master Card/i,
    });
    screen.debug(card);
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
      <MemoryRouter initialEntries={['/search/cards?q=&page=1']}>
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

describe('ThemeProvider -- when changing theme', () => {
  test('should toggle theme when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const initialTheme = document.documentElement.classList.contains('light');
    expect(initialTheme).not.toBe(true);

    const themeButton = await screen.findByLabelText('Change Theme');
    await user.click(themeButton);

    await waitFor(() => {
      const newTheme = document.documentElement.classList.contains('light');
      expect(newTheme).toBe(initialTheme);
    });
  });
});
