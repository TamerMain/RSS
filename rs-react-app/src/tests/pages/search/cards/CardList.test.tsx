import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, useLocation, type Location } from 'react-router';
import CardList from '@/pages/search/cards/CardList';
import MockListResponse from '@/test-utils/mockListResponse.json';

describe('CardList -- when user click on card', () => {
  test('should show master detail and list should remain', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search?q=Black%20Lotus&page=1']}>
        <CardList cardList={MockListResponse} />
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
      <MemoryRouter initialEntries={['/cards?page=1&q=Lotus']}>
        <Location />
        <CardList cardList={MockListResponse} />
      </MemoryRouter>
    );
    const card = screen.getByAltText(/Black Lotus/i);
    expect(location!.search).toContain('page');
    await user.click(card);
    await waitFor(() => {
      expect(location!.search).toContain('page');
      expect(location!.search).toContain(
        '?page=1&q=Lotus&details=4a2e428c-dd25-484c-bbc8-2d6ce10ef42c'
      );
    });
  });
});
