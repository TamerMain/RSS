import { configureStore } from '@reduxjs/toolkit';
import { formEntriesSlice } from './formEntriesSlice';

export const store = configureStore({
  reducer: {
    entries: formEntriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
