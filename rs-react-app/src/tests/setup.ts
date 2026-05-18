import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import mockListResponse from '../test-utils/mockListResponse.json';
import mockListDefaultResponse from '../test-utils/mockListDefaultResponse.json';
import mockDetailResponse from '../test-utils/mockDetailResponse.json';

export const restHandlers = [
  http.get('https://api.scryfall.com/cards/search', ({ request }) => {
    const url = request.url;

    if (
      url ===
      'https://api.scryfall.com/cards/search?page=1&q=Lotus+%28game%3Apaper%29'
    ) {
      return HttpResponse.json(mockListResponse);
    }

    if (
      url ===
      'https://api.scryfall.com/cards/search?page=1&q=+%28game%3Apaper%29'
    ) {
      return HttpResponse.json(mockListDefaultResponse);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.get(
    'https://api.scryfall.com/cards/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c',
    () => {
      return HttpResponse.json(mockDetailResponse);
    }
  ),
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
