import axios from "axios";
import Cookies from "js-cookie";
import {
  ACCESS_KEY,
  BASE_API_URL,
  REFRESH_KEY,
  TOKEN_REFRESH_API_URL,
} from "../constants";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const baseTokenlessAPI = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
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

const isAuthorized = async () => {
  const accessToken = Cookies.get(ACCESS_KEY);
  const refreshToken = Cookies.get(REFRESH_KEY);
  if (accessToken === undefined || refreshToken === undefined) {
    return false;
  }
  try {
    const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
    const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
    const accessTokenExpiration = decodedAccessToken.exp; // this will be in seconds
    const refreshTokenExpiration = decodedRefreshToken.exp;
    const now = Date.now() / 1000; // this ensures the "now" is in seconds, not milliseconds
    if (
      accessTokenExpiration === undefined ||
      refreshTokenExpiration === undefined
    ) {
      return false;
    }
    if (accessTokenExpiration > now) {
      // if current expiration is greater than the current time so essentially if it's not expired
      // then we can return true regardless cuz the user's access token works
      return true;
    }
    if (refreshTokenExpiration < now) {
      // if the refresh token is expired
      return false;
    }
    return await refreshSession();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default isAuthorized;
