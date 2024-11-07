import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "date",
  initialState: {
    // departure: "",
    // arrival: "",
    formData: {},
  },
  reducers: {
    addDates(state, action) {
      // state.departure = action.payload.departure;
      // state.arrival = action.payload.arrival;
      state.formData = action.payload;
    },
  },
});

export const { addDates } = slice.actions;

export default slice.reducer;
