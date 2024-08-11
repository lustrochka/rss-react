import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  objects: [],
};

export const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    setObjects: (state, action) => {
      state.objects = action.payload;
    },
  },
});

export const { setObjects } = objectsSlice.actions;
export default objectsSlice.reducer;
