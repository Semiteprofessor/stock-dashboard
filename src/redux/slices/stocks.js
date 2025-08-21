import { sum } from "lodash";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portfolio: {
    holdings: [],
    investedValue: 0,
    currentValue: 0,
    profitLoss: 0,
    cashBalance: 0,
  },
};

const slice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    getHoldings: (state, action) => {
      const holdings = action.payload;

      const investedValue = sum(
        holdings.map((stock) => stock.buyPrice * stock.quantity)
      );

      const currentValue = sum(
        holdings.map((stock) => stock.currentPrice * stock.quantity)
      );

      const profitLoss = currentValue - investedValue;

      state.portfolio.holdings = holdings;
      state.portfolio.investedValue = investedValue;
      state.portfolio.currentValue = currentValue;
      state.portfolio.profitLoss = profitLoss;
    },
  },
});

export default slice.reducer;

export const { getHoldings } = slice.actions;
