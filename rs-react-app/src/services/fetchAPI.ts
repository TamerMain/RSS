import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FETCH_BASE_URL,
  FETCH_SEARCH_URL,
  FETCH_DETAILS_URL,
  FETCH_CONTENT_ACCEPT,
  FETCH_CONTENT_TYPE,
} from '@/constants/fetch';
import {
  type SearchResponse,
  type SearchAPIResponse,
  type DetailsResponse,
  type FetchSearchParams,
} from '@/types/types';
import { createFetchSearchParams } from '@/utils/createFetchSearchParams';
import { transformFetchSearchResponse } from '@/utils/transformFetchSearchResponse';

export const fetchAPI = createApi({
  reducerPath: 'fetch',
  tagTypes: ['Card List', 'Details'],
  baseQuery: fetchBaseQuery({
    baseUrl: FETCH_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', FETCH_CONTENT_TYPE);
      headers.set('Accept', FETCH_CONTENT_ACCEPT);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchCardList: builder.query<SearchResponse, FetchSearchParams>({
      query: ({ q, page }) => {
        const url = `${FETCH_SEARCH_URL}${createFetchSearchParams({ q, page })}`;
        return url;
      },
      transformResponse: (
        res: SearchAPIResponse,
        _meta,
        params: FetchSearchParams
      ) => transformFetchSearchResponse(res, params),
      keepUnusedDataFor: 15000,
      providesTags: ['Card List'],
    }),
    fetchCardDetails: builder.query<DetailsResponse, string>({
      query: (id) => `${FETCH_DETAILS_URL}${id}`,
      keepUnusedDataFor: 15000,
      providesTags: ['Details'],
    }),
  }),
});

export const { useFetchCardListQuery, useFetchCardDetailsQuery } = fetchAPI;
