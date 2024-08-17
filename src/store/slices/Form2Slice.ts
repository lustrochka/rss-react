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

const Form2Slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData2: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData2 } = Form2Slice.actions;
export default Form2Slice.reducer;
