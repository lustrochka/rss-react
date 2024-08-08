import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  isDetailsLoading: true,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsDetailsLoading: (state, action) => {
      state.isDetailsLoading = action.payload;
    },
  },
});

export const { setIsLoading, setIsDetailsLoading } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
