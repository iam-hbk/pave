import wretch from "wretch";
import axios from "axios";

const api = wretch("https://cold-crews-fall.tunnelapp.dev/api")
  .errorType("json")
  .resolve((r) => r.json());

export const axios_api = axios.create({
  baseURL: "https://cold-crews-fall.tunnelapp.dev/api",
});

export default api;
