import { render, screen } from '@testing-library/react';
import About from '@/pages/about/About';

test('should have link to RS School and author', () => {
  render(<About />);
  const schoolLink = screen.getByRole('link', { name: 'RS School. React' });
  const authorName = screen.getByText(/TamerMain/);
  expect(schoolLink).toBeInTheDocument();
  expect(authorName).toBeInTheDocument();
});

