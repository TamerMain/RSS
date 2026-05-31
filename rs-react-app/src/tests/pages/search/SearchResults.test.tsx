import { render, screen, waitFor } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import SearchResults from '@/pages/search/SearchResults';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import {
  TEST_SEARCH_URL,
  TEST_SEARCH_INPUTS,
  TEST_SEARCH_PARAMS,
} from '@/test-utils/testCostants';

describe('SearchResults -- when loading', () => {
  test('should show loading spinner ', async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <SearchResults />
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

describe('SearchResults -- when initial load', () => {
  test('should check local storage for search term', () => {
    const storageGetSpy = vi.spyOn(Storage.prototype, 'getItem');
    render(
      <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
        <Provider store={store}>
          <SearchResults />
        </Provider>
      </MemoryRouter>
    );
    expect(storageGetSpy).toHaveBeenCalledWith('RecentSearch');
  });

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
    {
      term: TEST_SEARCH_INPUTS.NULL,
      status: 'Card List',
      expectedItems: 5,
    },
  ])(
    'should render $expectedItems cards from local storage when $term',
    async ({ term, status, expectedItems }) => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(term);
      render(
        <MemoryRouter initialEntries={[TEST_SEARCH_URL]}>
          <Provider store={store}>
            <SearchResults />
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

describe('SearchResults -- when accessing from link', () => {
  test.each([
    {
      params: TEST_SEARCH_PARAMS.NULL,
      status: 'Card List',
      expectedItems: 5,
    },
    {
      params: TEST_SEARCH_PARAMS.EMPTY,
      status: 'Card List',
      expectedItems: 5,
    },
    {
      params: TEST_SEARCH_PARAMS.VALID,
      status: 'Card List',
      expectedItems: 3,
    },
    {
      params: TEST_SEARCH_PARAMS.INVALID,
      status: 'No Cards Found With That Name',
      expectedItems: 0,
    },
    {
      params: TEST_SEARCH_PARAMS.NO_PAGE,
      status: 'No Cards Found On That Page',
      expectedItems: 0,
    },
    {
      params: TEST_SEARCH_PARAMS.PAGE_NOT_NUMBER,
      status: 'Page Must Be A Number',
      expectedItems: 0,
    },
  ])(
    'should render $expectedItems cards when $params and $status message',
    async ({ params, status, expectedItems }) => {
      render(
        <MemoryRouter
          initialEntries={[
            {
              pathname: TEST_SEARCH_URL,
              search: params,
            },
          ]}
        >
          <Provider store={store}>
            <SearchResults />
          </Provider>
        </MemoryRouter>
      );

      await waitFor(() => {
        const cardImage = screen.queryAllByRole('img', {
          name: /Image of/i,
        });
        expect(cardImage).toHaveLength(expectedItems);
        console.log(params);
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
