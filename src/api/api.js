import axios from "axios";

export let apiCancelToken;

const api = axios.create({
  baseURL: "https://api.github.com",
  cancelToken: new axios.CancelToken((c) => (apiCancelToken = c)),
});

export default api;
