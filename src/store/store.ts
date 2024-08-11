import { configureStore } from '@reduxjs/toolkit';
import selectedSlice from './slices/selectedSlice';

export const store = configureStore({
  reducer: {
    selected: selectedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
