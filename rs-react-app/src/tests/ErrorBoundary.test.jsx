import { render, screen } from '@testing-library/react';
import { Component } from 'react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../components/ErrorBoundary';

function MockErrorChild () {
  throw new Error('Test error')
  return {}
};

describe('when child error', () => {
  test('should show fallback UI', () => {
    render(
      <ErrorBoundary>
        <MockErrorChild />
      </ErrorBoundary>
    );
    const fallbackUI = screen.getByRole('heading', {
      level: 1,
      name: /Unexpected Error/i,
    });
    expect(fallbackUI).toBeInTheDocument();
  });

  test('should console.log error', () => {
    const logSpy = vi.spyOn(console, 'log');
    render(
      <ErrorBoundary>
        <MockErrorChild />
      </ErrorBoundary>
    );
    expect(logSpy).toHaveBeenCalledWith(
      'Uncaught error',
      expect.objectContaining({ message: 'Test error' }),
      expect.anything()
    );
  });
});
