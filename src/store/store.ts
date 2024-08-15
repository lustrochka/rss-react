import { configureStore } from '@reduxjs/toolkit';
import Form1Slice from './slices/Form1Slice';

export const store = configureStore({
  reducer: {
    data: Form1Slice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
