import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, useLocation, type Location } from 'react-router';
import CardList from '@/pages/search/+params/CardList';
import MockListResponse from '@/test-utils/mockListResponse.json';
import { store } from '@/store/store.ts';
import { Provider } from 'react-redux';

describe('when click on card', () => {
  test('should show master detail and list should remain', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search?q=Black%20Lotus&page=1']}>
        <Provider store={store}>
          <CardList resultList={MockListResponse} />
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
    const Location = () => {
      location = useLocation();
      return null;
    };
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search?q=Black%20Lotus&page=1']}>
        <Provider store={store}>
          <Location />
          <CardList resultList={MockListResponse} />
        </Provider>
      </MemoryRouter>
    );
    const card = screen.getByAltText(/Black Lotus/i);
    expect(location!.search).toContain('page');
    await user.click(card);
    await waitFor(() => {
      expect(location!.search).toContain('page');
      expect(location!.search).toContain('details=Black%2520Lotus');
    });
  });
});
