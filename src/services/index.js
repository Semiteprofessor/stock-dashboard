import alphaHttp from "./http";

const API_KEY = "4XZDK644NUQK0TOT";

export const getStocks = async (symbol = "IBM") => {
  const { data } = await alphaHttp.get("/query", {
    params: {
      function: "TIME_SERIES_INTRADAY",
      symbol,
      interval: "5min",
      apikey: API_KEY,
    },
  });

  const series = data["Time Series (5min)"] || {};
  const stocks = Object.entries(series).map(([time, values]) => ({
    time,
    open: values["1. open"],
    high: values["2. high"],
    low: values["3. low"],
    close: values["4. close"],
    volume: values["5. volume"],
  }));

  return stocks;
};
