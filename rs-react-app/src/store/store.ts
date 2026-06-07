import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

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
  reducer: { cart: cartSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
