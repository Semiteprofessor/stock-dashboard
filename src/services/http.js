import axios from "axios";

const alphaHttp = axios.create({
  baseURL: "https://www.alphavantage.co",
  timeout: 30000,
});

export default alphaHttp;
