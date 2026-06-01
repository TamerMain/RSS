import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, useLocation, type Location } from 'react-router';
import CardList from '@/pages/search/cards/CardList';
import mockListResponse from '@/test-utils/mockListResponse.json';
import { store } from '@/store/store.ts';
import { Provider } from 'react-redux';
import {
  TEST_SEARCH_URL,
  TEST_SEARCH_PARAMS,
  TEST_DETAILS_PARAMS,
} from '@/test-utils/testCostants';

describe('CardList -- when user click on card', () => {
  test('should show master detail and list should remain', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search/cards?q=Lotus&page=1']}>
        <Provider store={store}>
          <CardList cardList={mockListResponse} />
        </Provider>
      </MemoryRouter>
    );

    const card = screen.getByAltText(/Black Lotus/i);
    await user.click(card);
    await waitFor(() => {
      const details = screen.getByAltText(/Full Art of Black Lotus/i);
      expect(details).toBeInTheDocument();
      expect(card).toBeInTheDocument();
    });
  });
  test('should add details into params', async () => {
    let location: Location;
    const LocationProvider = () => {
      location = useLocation();
      return null;
    };
    const user = userEvent.setup();
    render(
      <MemoryRouter
        initialEntries={[`${TEST_SEARCH_URL}${TEST_SEARCH_PARAMS.VALID}`]}
      >
        <Provider store={store}>
          <LocationProvider />
          <CardList cardList={mockListResponse} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const card = screen.getByAltText(/Image of Black Lotus/i);
      user.click(card);
      expect(location!.search).toContain('page');
      expect(location!.search).toContain(
        `${TEST_SEARCH_PARAMS.VALID}${TEST_DETAILS_PARAMS.VALID}`
      );
    });
  });
});

describe('CardList -- when user clicks', () => {
  test('should show loading when opening details', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter
        initialEntries={[`${TEST_SEARCH_URL}${TEST_SEARCH_PARAMS.VALID}`]}
      >
        <Provider store={store}>
          <CardList cardList={mockListResponse} />
        </Provider>
      </MemoryRouter>
    );

    const loader = screen.queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();

    const card = await screen.findByRole('img', {
      name: /Image of Black Lotus/i,
    });
    await user.click(card);

    const newLoader = screen.getByTestId('loader');
    expect(newLoader).toBeInTheDocument();

    const fullCard = await screen.findByRole('img', {
      name: /Full Art of Black Lotus/i,
    });
    expect(fullCard).toBeInTheDocument();
  });

  test('should show error message on invalid input', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter
        initialEntries={[`${TEST_SEARCH_URL}${TEST_SEARCH_PARAMS.VALID}`]}
      >
        <Provider store={store}>
          <CardList cardList={mockListResponse} />
        </Provider>
      </MemoryRouter>
    );

    const card = await screen.findByRole('img', {
      name: /INVALID/i,
    });
    await user.click(card);

    const errorMessage = await screen.findByText(
      /details not found for that card/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('should on close button close and remove its params', async () => {
    let location: Location;
    const Location = () => {
      location = useLocation();
      return null;
    };
    const user = userEvent.setup();
    render(
      <MemoryRouter
        initialEntries={[
          `${TEST_SEARCH_URL}${TEST_SEARCH_PARAMS.VALID}${TEST_DETAILS_PARAMS.VALID}`,
        ]}
      >
        <Provider store={store}>
          <Location />
          <CardList cardList={mockListResponse} />
        </Provider>
      </MemoryRouter>
    );
    expect(location!.search).toContain('id');
    const closeButton = await screen.findByRole('button', { name: /X/i });
    await user.click(closeButton);
    await waitFor(() => {
      expect(location.search).not.toContain('id');
    });
  });
});
