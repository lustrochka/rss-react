import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    name: '',
    age: '',
    email: '',
    password: '',
    gender: '',
  },
};

const Form1DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = Form1DataSlice.actions;
export default Form1DataSlice.reducer;
