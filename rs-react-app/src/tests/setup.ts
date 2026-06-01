import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import mockListResponse from '../test-utils/mockListResponse.json';
import mockListDefaultResponse from '../test-utils/mockListDefaultResponse.json';
import mockListDefaultResponsePage2 from '../test-utils/mockListDefaultResponsePage2.json';
import mockDetailsResponse from '../test-utils/mockDetailsResponse.json';
import { clearCart } from '@/store/cartSlice';
import { fetchAPI } from '@/services/fetchAPI';
import { store } from '@/store/store';
import {
  TEST_FETCH_DELAY,
  TEST_FETCH_URL,
  TEST_FETCH_DETAILS_URL,
  TEST_FETCH_DETAILS_PARAMS,
  TEST_FETCH_PARAMS,
} from '@/test-utils/testCostants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const restHandlers = [
  http.get(TEST_FETCH_URL, async ({ request }) => {
    await delay(TEST_FETCH_DELAY);
    const url = request.url;
    if (url === `${TEST_FETCH_URL}${TEST_FETCH_PARAMS.VALID}`) {
      return HttpResponse.json(mockListResponse);
    }

    if (url === `${TEST_FETCH_URL}${TEST_FETCH_PARAMS.DEFAULT}`) {
      return HttpResponse.json(mockListDefaultResponse);
    }
    if (url === `${TEST_FETCH_URL}${TEST_FETCH_PARAMS.DEFAULT_PAGE_2}`) {
      return HttpResponse.json(mockListDefaultResponsePage2);
    }

    if (url === `${TEST_FETCH_URL}${TEST_FETCH_PARAMS.PAGE_NOT_FOUND}`) {
      return new HttpResponse(null, { status: 422 });
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.get(`${TEST_FETCH_DETAILS_URL}*`, async ({ request }) => {
    await delay(TEST_FETCH_DELAY);
    const url = request.url;
    if (url === `${TEST_FETCH_DETAILS_URL}${TEST_FETCH_DETAILS_PARAMS.VALID}`) {
      return HttpResponse.json(mockDetailsResponse[0]);
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
