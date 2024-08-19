import { configureStore } from '@reduxjs/toolkit';
import Form1Slice from './slices/Form1Slice';
import Form2Slice from './slices/Form2Slice';
import CountriesSlice from './slices/CountriesSlice';

export const store = configureStore({
  reducer: {
    data: Form1Slice,
    data2: Form2Slice,
    countries: CountriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
