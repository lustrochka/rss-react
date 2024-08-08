import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  object: {},
};

export const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    setObject: (state, action) => {
      state.object = action.payload;
    },
  },
});

export const { setObject } = objectSlice.actions;
export default objectSlice.reducer;
