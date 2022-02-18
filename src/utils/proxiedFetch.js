const PROXY_URL = "https://cors-anywhere.herokuapp.com";

export const proxiedFetch = (url, options = {}) =>
  fetch(`${PROXY_URL}/${url}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });
