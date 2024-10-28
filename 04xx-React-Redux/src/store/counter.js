import { createSlice } from "@reduxjs/toolkit";

// const slice = createSlice({
//   name: "counter",
//   initialState: {
//     total: 0,
//   },
//   reducers: {
//     increase(state) {
//       // state.total++;
//       // ou assim
//       return { total: state.total + 1 };
//     },
//     decrease(state) {
//       state.total--;
//     },
//   },
// });

const slice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increase: (state) => state + 1,
    decrease: (state) => state - 1,
    add: {
      reducer: (state, action) => state + action.payload,
      prepare: (payload) => ({ payload, meta: "local" }),
    },
  },
});

export const { increase, decrease, add } = slice.actions;
export default slice.reducer;

// import { createAction } from "@reduxjs/toolkit";

// export const increase = createAction("INCREASE");
// export const decrease = createAction("DECREASE");

// function counter(state = 0, action) {
//   switch (action.type) {
//     case increase.type:
//       return state + 1;

//     case decrease.type:
//       return state - 1;

//     default:
//       return state;
//   }
// }

// export default counter;
