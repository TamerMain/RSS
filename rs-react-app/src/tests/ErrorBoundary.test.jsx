import { render, screen } from '@testing-library/react';

import ErrorBoundary from '../components/ErrorBoundary';

const MockErrorChild = () => {
  throw new Error('Test error');
};

test('should show fallback UI on child error', () => {
  render(
    <ErrorBoundary>
      <MockErrorChild />
    </ErrorBoundary>
  );
  const fallbackUI = screen.getByRole('heading', {level: 1})
  expect(fallbackUI).toBeInTheDocument();

});
