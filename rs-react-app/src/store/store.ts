import { configureStore } from '@reduxjs/toolkit';
import { fetchAPI } from '@/services/fetchAPI';
import { cartSlice } from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    [fetchAPI.reducerPath]: fetchAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
