import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import stockReducer from "./slices/stocks";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const stockPersistConfig = {
  key: "stocks",
  storage,
  keyPrefix: "redux-",
  whitelist: ["portfolio", "transactions", "watchlist"],
};

const reducer = combineReducers({
  stocks: persistReducer(stockPersistConfig, stockReducer),
});

export { rootPersistConfig, reducer };
