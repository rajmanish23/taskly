import axios from "axios";
import Cookies from "js-cookie";
import { decamelizeKeys } from "humps";

import { ACCESS_KEY, BASE_API_URL } from "../constants";
import {
  areTokensValid,
  isAccessTokenExpired,
  isRefreshTokenExpired,
} from "../utils/tokenValidator";
import { refreshSession } from "./isAuthorizedAPI";

const baseTokenfulAPI = axios.create({
  baseURL: BASE_API_URL,
  transformRequest: [
    (data, headers) => {
      headers["Content-Type"] = "application/json";
      return JSON.stringify(decamelizeKeys(data));
    },
  ],
});

baseTokenfulAPI.interceptors.request.use(
  async (config) => {
    if (!areTokensValid()) throw Error("Tokens are not valid");
    if (isAccessTokenExpired()) {
      if (isRefreshTokenExpired()) throw Error("Refresh token is expired");
      // The function below set's the token as the cookie by itself so just waiting for this to set
      // and then trying to access the token should return the new access token.
      await refreshSession();
    }
    const token = Cookies.get(ACCESS_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseTokenfulAPI;
