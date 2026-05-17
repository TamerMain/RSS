import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import mockAPIResponse from '../test-utils/mockAPIResponse.json';
import mockAPIDefaultResponse from '../test-utils/mockAPIDefaultResponse.json';

export const restHandlers = [
  http.get('https://api.scryfall.com/cards/search', ({ request }) => {
    const url = request.url;

    if (
      url === 'https://api.scryfall.com/cards/search?page=1&q=Lotus+%28game%3Apaper%29'
    ) {
      return HttpResponse.json(mockAPIResponse);
    }

    if (url === 'https://api.scryfall.com/cards/search?page=1&q=+%28game%3Apaper%29') {
      return HttpResponse.json(mockAPIDefaultResponse);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];

export const server = setupServer(...restHandlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => server.close());

afterEach(() => {
  localStorage.clear();
  server.resetHandlers();
  vi.restoreAllMocks();
  cleanup();
});
