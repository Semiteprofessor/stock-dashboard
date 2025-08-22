import React from "react";
import { useQuery } from "@tanstack/react-query";

import * as api from "./services";

import { Search, Menu, TrendingUp, TrendingDown } from "lucide-react";

const indices = [
  { name: "S&P 500", value: 5464.61, change: -0.16, color: "red", flag: "🇺🇸" },
  {
    name: "Nasdaq 100",
    value: 19700.43,
    change: -0.26,
    color: "red",
    flag: "🇺🇸",
  },
  { name: "Dow 30", value: 39150.34, change: 0.04, color: "green", flag: "🇺🇸" },
  {
    name: "Nikkei 225",
    value: 38596.4,
    change: -0.09,
    color: "red",
    flag: "🇯🇵",
  },
];

const StockDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-stocks", "IBM"],
    queryFn: () => api.getStocks("IBM"),
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col">
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-bold text-blue-500">Stock</span>
          <nav className="hidden md:flex space-x-6">
            {["Products", "Community", "Markets", "News", "Brokers"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white rounded-full py-2 px-4 pl-10 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button className="bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors duration-200">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-grow p-6 overflow-hidden flex">
        <div className="flex-grow mr-4">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            Stock Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {indices.map((index) => (
              <div
                key={index.name}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 flex items-center">
                    <span className="mr-2 text-lg">{index.flag}</span>
                    {index.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      index.color === "green"
                        ? "bg-green-900 text-green-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {index.change > 0 ? "+" : ""}
                    {index.change}%
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {index.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Open</th>
                  <th className="px-4 py-2 text-left">High</th>
                  <th className="px-4 py-2 text-left">Low</th>
                  <th className="px-4 py-2 text-left">Close</th>
                  <th className="px-4 py-2 text-left">Volume</th>
                </tr>
              </thead>
              <tbody>
                {(isLoading ? Array.from(new Array(5)) : data)?.map(
                  (stock, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-700 last:border-none"
                    >
                      <td className="px-4 py-2">
                        {isLoading ? "Loading..." : stock.time}
                      </td>
                      <td className="px-4 py-2">
                        {isLoading ? "..." : stock.open}
                      </td>
                      <td className="px-4 py-2">
                        {isLoading ? "..." : stock.high}
                      </td>
                      <td className="px-4 py-2">
                        {isLoading ? "..." : stock.low}
                      </td>
                      <td className="px-4 py-2">
                        {isLoading ? "..." : stock.close}
                      </td>
                      <td className="px-4 py-2">
                        {isLoading ? "..." : stock.volume}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {!isLoading && !data?.length && (
              <p className="text-center text-red-500 font-semibold mt-3">
                No stocks found
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StockDashboard;
