import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type EntryFormData } from '@/schemas/formSchema';

export type EntryStoreData = Omit<EntryFormData, 'imageUpload'> & {
  imageUpload: string;
};

const initialState: EntryStoreData[] = [];
export const formEntriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<EntryStoreData>) => {
      state.push(action.payload);
    },
  },
});

export const { addEntry } = formEntriesSlice.actions;
