import { render, screen } from '@testing-library/react';
import { Component } from 'react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../components/ErrorBoundary';

function MockErrorChild () {
  throw new Error('Test error')
  return {}
};

describe('ErrorBoundary -- when child has error', () => {
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
<<<<<<< HEAD
=======

describe('ErrorBoundary -- when click fallback refresh button', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    vi.stubGlobal('location', {
      ...originalLocation,
      reload: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('should refresh page', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <MockErrorChild />
      </ErrorBoundary>
    );
    const refreshButton = screen.getByRole('button', { name: 'Refresh Page' });
    await user.click(refreshButton);
    await expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
>>>>>>> f05f595 (refactor: mentor changes)
