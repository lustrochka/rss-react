import { configureStore } from '@reduxjs/toolkit';
import selectedSlice from './slices/selectedSlice';
import objectsSlice from './slices/objectsSlice';
import { stapi } from '../api/api';

export const store = configureStore({
  reducer: {
    objects: objectsSlice,
    selected: selectedSlice,
    [stapi.reducerPath]: stapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stapi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
