const PROXY_URL = "https://cors-anywhere.herokuapp.com";
import axios from "axios";

export const proxiedFetch = (url, options = {}) =>
  axios.get(`${PROXY_URL}/${url}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });
