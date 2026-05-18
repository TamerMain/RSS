import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NotFound from '@/pages/404/NotFound';

test('should render have return button', async () => {
  render(
    <MemoryRouter initialEntries={['/AAAAA']}>
      <NotFound />
    </MemoryRouter>
  );
  const refreshButton = screen.getByRole('button', { name: 'Home Page' });
  expect(refreshButton).toBeInTheDocument();
});
