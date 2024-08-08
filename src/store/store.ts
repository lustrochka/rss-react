import { configureStore } from '@reduxjs/toolkit';
import selectedSlice from './slices/selectedSlice';
import objectsSlice from './slices/objectsSlice';
import objectSlice from './slices/objectSlice';
import isLoadingSlice from './slices/isLoadingSlice';
import isLastSlice from './slices/isLastSlice';

export const store = configureStore({
  reducer: {
    objects: objectsSlice,
    object: objectSlice,
    selected: selectedSlice,
    isLoading: isLoadingSlice,
    isLast: isLastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
