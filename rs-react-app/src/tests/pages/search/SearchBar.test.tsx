import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/pages/search/SearchBar';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { TEST_SEARCH_URL } from '@/test-utils/testCostants';
import { mockUserInput } from '@/test-utils/mockUserInput';

describe('SearchBar -- when loading', () => {
  test('should disable UI', async () => {
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <SearchBar />
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
});

describe('SearchBar -- when initial load', () => {
  test('should check local storage for search term', () => {
    const storageGetSpy = vi.spyOn(Storage.prototype, 'getItem');
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </MemoryRouter>
    );
    expect(storageGetSpy).toHaveBeenCalledWith('RecentSearch');
  });
  test('should contain local storage search term as input value', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('Lotus');
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </MemoryRouter>
    );
    const searchBar = await screen.findByRole('searchbox');
    expect(searchBar).toHaveValue('Lotus');
  });
});

describe('SearchBar -- when user search', () => {
  test('should not make extra requests if search term remains the same', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(window, 'fetch');
    render(
      <MemoryRouter initialEntries={['/search/cards']}>
        <Provider store={store}>
          <SearchBar />
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
          <SearchBar />
        </Provider>
      </MemoryRouter>
    );
    await mockUserInput(user, '        Lotus');
    expect(storageSetSpy).toHaveBeenCalledWith('RecentSearch', 'Lotus');
  });
});
