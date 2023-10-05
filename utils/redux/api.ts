import wretch from "wretch";
import axios from "axios";

const api = wretch("https://haec.serveo.net/api")
  .errorType("json")
  .resolve((r) => r.json());

export const axios_api = axios.create({
  baseURL: "https://haec.serveo.net/api",
});

export default api;
