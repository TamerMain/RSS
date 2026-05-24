import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

const initialState: string[] = [];
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<string>) => {
      const index = state.indexOf(action.payload);
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

