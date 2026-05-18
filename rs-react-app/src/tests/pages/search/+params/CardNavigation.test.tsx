import { render, screen, waitFor } from '@testing-library/react';

import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import CardNavigation from '@/pages/search/+params/CardNavigation';
import mockListResponse from '@/test-utils/mockListResponse.json';

test('should update list when click another page', async () => {
  const user = userEvent.setup();
  const mockUpdate = vi.fn();
  render(
    <MemoryRouter initialEntries={['/search?q=Black%20Lotus&page=1']}>
      <CardNavigation
        updateResultList={mockUpdate}
        resultList={mockListResponse}
      />
    </MemoryRouter>
  );
  const unactivePage = screen.getByText('3');
  await user.click(unactivePage);
  await waitFor(() => {
    expect(mockUpdate).toHaveBeenCalledWith('', 3);
  });
});
