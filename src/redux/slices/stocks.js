import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portfolio: {
    holdings: [],
  },
};

const slice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    getHoldings: (state, action) => {
      const holdings = action.payload;

      state.portfolio.holdings = holdings;
    },
  },
});

export default slice.reducer;

export const { getHoldings } = slice.actions;
