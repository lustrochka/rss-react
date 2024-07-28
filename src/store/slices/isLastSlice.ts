import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLast: false,
};

export const isLastSlice = createSlice({
  name: 'isLast',
  initialState,
  reducers: {
    setIsLast: (state, action) => {
      state.isLast = action.payload;
    },
  },
});

export const { setIsLast } = isLastSlice.actions;
export default isLastSlice.reducer;
