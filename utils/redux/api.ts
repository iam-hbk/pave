import wretch from "wretch";

const api = wretch("https://twenty-tools-jam.tunnelapp.dev/api")
  .errorType("json")
  .resolve((r) => r.json());

export default api;
