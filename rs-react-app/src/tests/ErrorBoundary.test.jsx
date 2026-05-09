import { render, screen } from '@testing-library/react';
import { Component } from 'react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../components/ErrorBoundary';

class MockErrorChild extends Component {
  render() {
    throw new Error('Test error');
  }
}

describe('when initial load on child error', () => {
  test('should show fallback UI on child error', () => {
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

  test('should console.log error on child error', () => {
    const logSpy = vi.spyOn(console, 'log');
    render(
      <ErrorBoundary>
        <MockErrorChild />
      </ErrorBoundary>
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});

describe('when click refresh button on child error', () => {
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

  test('should refresh page when click refresh button', async () => {
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
