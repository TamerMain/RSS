import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, useLocation, type Location } from 'react-router';
import { server } from '@/tests/setup';
import { http, HttpResponse } from 'msw';
import CardMasterDetail from '@/pages/search/+params/CardMasterDetail';

test('should show loading when opening details', async () => {
  render(
    <MemoryRouter
      initialEntries={[
        '/search?q=Black%20Lotus&page=1&details=Black%2520Lotus',
      ]}
    >
      <CardMasterDetail
        activeCard="4a2e428c-dd25-484c-bbc8-2d6ce10ef42c"
        setActiveCard={vi.fn()}
      />
    </MemoryRouter>
  );
  const loading = screen.getAllByText(/⟡/);
  expect(loading).toHaveLength(2);
  const closeButton = screen.queryByRole('button', { name: /X/i });
  expect(closeButton).toEqual(null);
  await waitFor(() => {
    const loadingAfter = screen.queryAllByText(/⟡/);
    expect(loadingAfter).toHaveLength(0);
    const closeButtonAfter = screen.getByRole('button', { name: /X/i });
    expect(closeButtonAfter).toBeInTheDocument();
  });
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
    <MemoryRouter initialEntries={['/search']}>
      <CardMasterDetail
        activeCard="4a2e428c-dd25-484c-bbc8-2d6ce10ef42c"
        setActiveCard={vi.fn()}
      />
    </MemoryRouter>
  );
  const errorMessage = await screen.findByText(
    /Details not found for that card/i
  );
  expect(errorMessage).toBeInTheDocument();
});

test('should close details and remove details params', async () => {
  let location: Location;
  const Location = () => {
    location = useLocation();
    return null;
  };
  const user = userEvent.setup();
  const mockSetActiveCard = vi.fn();
  render(
    <MemoryRouter
      initialEntries={[
        '/search?q=Black%20Lotus&page=1&details=Black%2520Lotus',
      ]}
    >
      <Location />
      <CardMasterDetail
        activeCard="4a2e428c-dd25-484c-bbc8-2d6ce10ef42c"
        setActiveCard={mockSetActiveCard}
      />
    </MemoryRouter>
  );
  const closeButton = await screen.findByRole('button', { name: /X/i });
  await user.click(closeButton);
  await waitFor(() => {
    expect(mockSetActiveCard).toHaveBeenCalledWith(undefined);
    expect(location.search).not.toContain('details');
  });
});
