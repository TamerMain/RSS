import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import mockAPIResponse from '../test-utils/mockAPIResponse.json';
import mockAPIDefaultResponse from '../test-utils/mockAPIDefaultResponse.json';

export const restHandlers = [
  http.get(
    'https://api.scryfall.com/cards/search?q=+%28game%3Apaper%29',
    () => {
      return HttpResponse.json(mockAPIDefaultResponse);
    }
  ),
  http.get(
    'https://api.scryfall.com/cards/search?q=Lotus+%28game%3Apaper%29',
    () => {
      return HttpResponse.json(mockAPIResponse);
    }
  ),
  http.get('https://api.scryfall.com/cards/search?q=*', () => {
    return new HttpResponse(null, { status: 404 });
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});
