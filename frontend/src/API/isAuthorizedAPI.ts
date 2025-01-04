import axios from "axios";
import Cookies from "js-cookie";
import {
  ACCESS_KEY,
  BASE_API_URL,
  REFRESH_KEY,
  TOKEN_REFRESH_API_URL,
} from "../constants";
import { decamelizeKeys } from "humps";

export const baseTokenlessAPI = axios.create({
  baseURL: BASE_API_URL,
  transformRequest: [
    (data, headers) => {
      headers["Content-Type"] = "application/json";
      return JSON.stringify(decamelizeKeys(data));
    },
  ],
});

export const refreshSession = async () => {
  const refreshToken = Cookies.get(REFRESH_KEY);
  if (refreshToken === undefined) {
    throw new Error("Refresh Token is undefined!");
  }
  const res = await baseTokenlessAPI.post(TOKEN_REFRESH_API_URL, {
    refresh: refreshToken,
  });
  if (res.status === 200) {
    Cookies.set(ACCESS_KEY, res.data.access, {
      sameSite: "Strict",
      secure: true,
    });
    return res.data.access;
  } else {
    throw new Error("API threw some other non-error status code");
  }
};
