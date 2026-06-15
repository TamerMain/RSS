import { render, screen, waitFor } from '@testing-library/react';

import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import CardPagination from '@/pages/search/cards/CardPagination';
import mockListResponse from '@/test-mocks/mockListResponse.json';

describe('CardPagination -- when render', () => {
  test('should update list when click another page', async () => {
    const user = userEvent.setup();
    const mockUpdate = vi.fn();
    render(
      <MemoryRouter initialEntries={['/search?q=Lotus&page=1']}>
        <CardPagination
          setSearchParams={mockUpdate}
          cardList={mockListResponse}
        />
      </MemoryRouter>
    );
    const unactivePage = screen.getByText('3');
    await user.click(unactivePage);
    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({ q: 'Lotus', page: 3 });
    });
  });
});
