import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import mockListResponse from '../test-utils/mockListResponse.json';
import mockListDefaultResponse from '../test-utils/mockListDefaultResponse.json';
import mockDetailResponse from '../test-utils/mockDetailResponse.json';
import {
  FETCH_SEARCH_BASE_URL,
  FETCH_DETAILS_BASE_URL,
} from '@/constants/fetch';

export const restHandlers = [
  http.get(FETCH_SEARCH_BASE_URL, ({ request }) => {
    const url = request.url;

    if (url === `${FETCH_SEARCH_BASE_URL}?page=1&q=Lotus+game%3Apaper`) {
      return HttpResponse.json(mockListResponse);
    }

    if (url === `${FETCH_SEARCH_BASE_URL}?page=1&q=+game%3Apaper`) {
      return HttpResponse.json(mockListDefaultResponse);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.get(
    `${FETCH_DETAILS_BASE_URL}4a2e428c-dd25-484c-bbc8-2d6ce10ef42c`,
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
