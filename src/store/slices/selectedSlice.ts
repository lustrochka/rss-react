import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: {},
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = selectedSlice.actions;
export default selectedSlice.reducer;
