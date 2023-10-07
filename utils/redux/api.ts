import wretch from "wretch";
import axios from "axios";

const api = wretch("https://pave-server.onrender.com/api")
  .errorType("json")
  .resolve((r) => r.json());

export const axios_api = axios.create({
  baseURL: "https://pave-server.onrender.com/api",
});

export default api;
