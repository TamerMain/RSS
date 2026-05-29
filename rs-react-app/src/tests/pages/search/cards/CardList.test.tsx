import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, useLocation, type Location } from 'react-router';
import CardList from '@/pages/search/cards/CardList';
import MockListResponse from '@/test-utils/mockListResponse.json';
import { store } from '@/store/store.ts';
import { Provider } from 'react-redux';
import { server } from '@/tests/setup';
import { http, HttpResponse } from 'msw';

describe('CardList -- when user click on card', () => {
  test('should show master detail and list should remain', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search/cards?q=Lotus&page=1']}>
        <Provider store={store}>
          <CardList cardList={MockListResponse} />
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
      <MemoryRouter initialEntries={['/search/cards?q=Lotus&page=1']}>
        <Provider store={store}>
          <LocationProvider />
          <CardList cardList={MockListResponse} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const card = screen.getByAltText(/Image of Black Lotus/i);
      user.click(card);
      expect(location!.search).toContain('page');
      expect(location!.search).toContain(
        '?q=Lotus&page=1&details=4a2e428c-dd25-484c-bbc8-2d6ce10ef42c'
      );
    });
  });
});

describe('CardList/CardMasterDetails -- when user clicks', () => {
  test('should show loading when opening details', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/search/cards?q=Lotus&page=1']}>
        <Provider store={store}>
          <CardList cardList={MockListResponse} />
        </Provider>
      </MemoryRouter>
    );

    const card = await screen.findByRole('img', {
      name: /Image of Black Lotus Card/i,
    });
    await user.click(card);

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', { name: /X/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('should have readable error status on fetch error', async () => {
    server.use(
      http.get(
        'https://api.scryfall.com/cards/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c',
        () => {
          return HttpResponse.error();
        }
      )
    );
    render(
      <MemoryRouter
        initialEntries={[
          '/search/cards?q=Lotus&page=1&details=4a2e428c-dd25-484c-bbc8-2d6ce10ef42c',
        ]}
      >
        <Provider store={store}>
          <CardList cardList={MockListResponse} />
        </Provider>
      </MemoryRouter>
    );
    waitFor(() => {
      const errorMessage = screen.getByText(/details not found for that card/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('should close details and remove details params on "X" button', async () => {
    let location: Location;
    const Location = () => {
      location = useLocation();
      return null;
    };
    const user = userEvent.setup();
    render(
      <MemoryRouter
        initialEntries={[
          '/search/cards?q=Lotus&page=1&details=4a2e428c-dd25-484c-bbc8-2d6ce10ef42c',
        ]}
      >
        <Provider store={store}>
          <Location />
          <CardList cardList={MockListResponse} />
        </Provider>
      </MemoryRouter>
    );
    const closeButton = await screen.findByRole('button', { name: /X/i });
    await user.click(closeButton);
    await waitFor(() => {
      expect(location.search).not.toContain('details');
    });
  });
});
