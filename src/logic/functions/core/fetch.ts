import ky, { Options } from "ky";

const createRequest = async (
  url: string,
  requestType: string,
  options: Options = {}
) => {
  const additionalOptions: Options = {
    timeout: 5000,
    method: requestType,
    retry: {
      limit: 2,
      // statusCodes: []
    },
    headers: {
      ...options.headers,
      // ...ba
    },
  };
  try {
    return ky(url, {
      ...options,
      ...additionalOptions,
    }).json();
  } catch (err) {
    throw err;
  }
};

export const get = (url: string, options?: Options) => {
  return createRequest(url, "GET", options);
};

export const post = (url: string, options?: Options) => {
  return createRequest(url, "POST", options);
};
