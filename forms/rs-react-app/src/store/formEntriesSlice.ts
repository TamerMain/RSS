import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FormData } from '@/schemas/formSchema';

const initialState: FormData[] = [];
export const formEntriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
    clearEntries: () => initialState,
  },
});

export const { addEntry, clearEntries } = formEntriesSlice.actions;
