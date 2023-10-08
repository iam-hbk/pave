import wretch from "wretch";
import axios from "axios";

const api = wretch("http://localhost:4001/api")
  .errorType("json")
  .resolve((r) => r.json());

export const axios_api = axios.create({
  baseURL: "http://localhost:4001/api",
});

export default api;
