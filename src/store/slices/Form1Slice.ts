import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    name: '',
    age: '',
    email: '',
    password: '',
    gender: '',
    image: '',
  },
};

const Form1Slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = Form1Slice.actions;
export default Form1Slice.reducer;
