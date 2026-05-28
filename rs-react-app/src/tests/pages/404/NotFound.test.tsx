import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation, type Location } from 'react-router';
import userEvent from '@testing-library/user-event';

import NotFound from '@/pages/404/NotFound';

describe('NotFound -- when accessing invalid URL', () => {
  test('should return to search on home page button', async () => {
    let location: Location;
    const Location = () => {
      location = useLocation();
      return null;
    };
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/AAAAA']}>
        <Location />
        <NotFound />
      </MemoryRouter>
    );
    expect(location!.pathname).toEqual('/AAAAA');
    const refreshButton = screen.getByRole('button', { name: 'Home Page' });
    await user.click(refreshButton);
    await waitFor(() => {
      expect(location!.pathname).toEqual('/');
    });
  });
});
