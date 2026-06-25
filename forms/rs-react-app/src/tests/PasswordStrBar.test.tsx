import { render, screen } from '@testing-library/react';
import PasswordStrBar from '@/components/PasswordStrBar';

describe('PasswordStrBar', () => {
  test.each([
    ['', 'bg-transparent w-0'],
    ['A', 'bg-red-400 w-12'],
    ['Aa', 'bg-orange-300 w-24'],
    ['Aa1', 'bg-yellow-300 w-36'],
    ['Aa1@', 'bg-green-300 w-48'],
  ])("should render correct strength for '%s'", (password, expected) => {
    render(<PasswordStrBar password={password} />);
    const strengthBar = screen.getByTestId('password_str');
    expect(strengthBar).toHaveClass(expected);
  });
});
