import { configureStore } from '@reduxjs/toolkit';
import { formEntriesSlice } from './formEntriesSlice';
import CountryList from '@/assets/country-list.json';

export const store = configureStore({
  reducer: {
    entries: formEntriesSlice.reducer,
    countries: () => CountryList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Countries = typeof CountryList;
export default store;
