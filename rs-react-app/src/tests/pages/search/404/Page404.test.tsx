import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import Page404 from '@/pages/search/404/Page404';

test('should perform search again on refresh button', async () => {
  const user = userEvent.setup();
  const mockSearchAgain = vi.fn();
  render(
    <MemoryRouter initialEntries={['/search/404']}>
      <Page404 isError={'404'} updateResultList={mockSearchAgain} />
    </MemoryRouter>
  );
  const refreshButton = screen.getByRole('button', { name: 'Search Again' });
  await user.click(refreshButton);
  expect(mockSearchAgain).toHaveBeenCalledWith('');
});
