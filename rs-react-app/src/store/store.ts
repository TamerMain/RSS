import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { fetchAPI } from '@/services/fetchAPI';

export type CardInfo = {
  name: string;
  id: string;
  imageSrc: string | undefined;
  page: number;
  search: string;
};
const initialState: CardInfo[] = [];
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CardInfo>) => {
      const index = state.findIndex((i) => i.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
    clearCart: () => initialState,
  },
});
export const { toggleItem, clearCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    [fetchAPI.reducerPath]: fetchAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Add this for dispatch typing
export default store;
