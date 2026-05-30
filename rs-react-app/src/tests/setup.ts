import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import mockListResponse from '../test-utils/mockListResponse.json';
import mockListDefaultResponse from '../test-utils/mockListDefaultResponse.json';
import mockDetailResponse from '../test-utils/mockDetailResponse.json';
import { clearCart } from '@/store/cartSlice';
import { fetchAPI } from '@/services/fetchAPI';
import { store } from '@/store/store';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const restHandlers = [
  http.get('https://api.scryfall.com/cards/search', async ({ request }) => {
    await delay(600);
    const url = request.url;
    if (
      url ===
      'https://api.scryfall.com/cards/search?page=1&q=Lotus+game%3Apaper'
    ) {
      return HttpResponse.json(mockListResponse);
    }

    if (
      url === 'https://api.scryfall.com/cards/search?page=1&q=+game%3Apaper'
    ) {
      return HttpResponse.json(mockListDefaultResponse);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.get('https://api.scryfall.com/cards/*', async ({ request }) => {
    await delay(600);
    const url = request.url;
    if (
      url ===
      'https://api.scryfall.com/cards/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c'
    ) {
      return HttpResponse.json(mockDetailResponse);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

export const server = setupServer(...restHandlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

beforeEach(() => {
  server.resetHandlers();
  server.use(...restHandlers);
});

afterAll(() => server.close());

afterEach(() => {
  store.dispatch(clearCart());
  store.dispatch(fetchAPI.util.resetApiState());
  localStorage.clear();
  vi.restoreAllMocks();
  cleanup();
});
