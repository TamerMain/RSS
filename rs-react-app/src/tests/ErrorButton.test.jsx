import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorButton from '../components/ErrorButton';

test('should throw error on click', async () => {
  const user = userEvent.setup();
  render(<ErrorButton />);
  const button = screen.getByRole('button');

  await expect(() => user.click(button)).rejects.toThrow(/Unexpected Error/i);
});