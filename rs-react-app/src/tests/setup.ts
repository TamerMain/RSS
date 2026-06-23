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
  http.get(TEST_FETCH_URL, async ({ request }) => {
    await delay(TEST_FETCH_DELAY);
    const url = request.url;

    if (url === `${FETCH_SEARCH_BASE_URL}?page=1&q=Lotus+game%3Apaper`) {
      return HttpResponse.json(mockListResponse);
    }

    if (url === `${FETCH_SEARCH_BASE_URL}?page=1&q=+game%3Apaper`) {
      return HttpResponse.json(mockListDefaultResponse);
    }
    if (url === `${TEST_FETCH_URL}${TEST_FETCH_PARAMS.DEFAULT_PAGE_2}`) {
      return HttpResponse.json(mockListDefaultResponsePage2);
    }

    if (url === `${TEST_FETCH_URL}${TEST_FETCH_PARAMS.PAGE_NOT_FOUND}`) {
      return new HttpResponse(null, {
        status: HTTP_STATUS.UNPROCESSABLE_CONTENT,
      });
    }

    return new HttpResponse(null, { status: HTTP_STATUS.NOT_FOUND });
  }),

  http.get(
    `${FETCH_DETAILS_BASE_URL}4a2e428c-dd25-484c-bbc8-2d6ce10ef42c`,
    () => {
      return HttpResponse.json(mockDetailResponse);
    }
    if (
      url ===
      `${TEST_FETCH_DETAILS_URL}${TEST_FETCH_DETAILS_PARAMS.VALID_SECOND}`
    ) {
      return HttpResponse.json(mockDetailsResponse[1]);
    }
    if (
      url === `${TEST_FETCH_DETAILS_URL}${TEST_FETCH_DETAILS_PARAMS.INVALID}`
    ) {
      return new HttpResponse(null);
    }
    return new HttpResponse(null, { status: HTTP_STATUS.NOT_FOUND });
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
