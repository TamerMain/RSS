import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import App from '../App';
import { server } from './setup';
import { http, HttpResponse } from 'msw';
import { mockUserInput } from '../test-utils/mockUserInput';

describe('when initial load', () => {
  test('should check local storage for search term', () => {
    const storageGetSpy = vi.spyOn(Storage.prototype, 'getItem');
    render(<App />);
    expect(storageGetSpy).toHaveBeenCalledWith('RecentSearch');
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
      render(<App />);
      await waitFor(() => {
        const cardImage = screen.queryAllByRole('img', {
          name: /Image of/i,
        });
        const statusBar = screen.getByRole('heading', {
          level: 1,
          name: status,
        });
        expect(cardImage).toHaveLength(expectedItems);
        expect(statusBar).toBeInTheDocument();
        localStorage.clear();
        vi.restoreAllMocks();
        cleanup();
      });
    }
  );
});

describe('when user search', () => {
  test('should write trimmed search term into storage', async () => {
    const user = userEvent.setup();
    const storageSetSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(<App />);
    await mockUserInput(user, '        Lotus');
    expect(storageSetSpy).toHaveBeenCalledWith('RecentSearch', 'Lotus');
  });
  test('should send proper fetch request', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(window, 'fetch');
    render(<App />);
    await mockUserInput(user, 'Lotus');
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.scryfall.com/cards/search?q=Lotus+%28game%3Apaper%29',
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json;q=0.9,*/*;q=0.8',
        },
        method: 'GET',
      })
    );
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
      render(<App />);
      await mockUserInput(user, term);
      await waitFor(() => {
        const cardImage = screen.queryAllByRole('img', {
          name: /Image of/i,
        });
        const statusBar = screen.getByRole('heading', {
          level: 1,
          name: status,
        });
        expect(cardImage).toHaveLength(expectedItems);
        expect(statusBar).toBeInTheDocument();
        localStorage.clear();
        vi.restoreAllMocks();
        cleanup();
      });
    }
  );
  describe('when unexpected server error', () => {
    test('should have readable error status', async () => {
      const user = userEvent.setup();
      server.use(
        http.get('https://api.scryfall.com/cards/search', () => {
          return HttpResponse.error();
        })
      );
      render(<App />);
      await mockUserInput(user, '');
      const searchButton = screen.getByRole('button', {
        name: 'Find Cards',
      });
      await user.click(searchButton);
      const unexpectedStatus = await screen.findByText('Something Went Wrong');
      expect(unexpectedStatus).toBeInTheDocument();
    });
  });
});

describe('when loading', () => {
  test('should disable UI', async () => {
    render(<App />);
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
    render(<App />);
    const loading = screen.getAllByText(/⟡/);
    expect(loading).toHaveLength(2);
    await waitFor(() => {
      const loadingAfter = screen.queryAllByText(/⟡/);
      expect(loadingAfter).toHaveLength(2);
    });
  });
});
