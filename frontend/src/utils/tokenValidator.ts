import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { ACCESS_KEY, REFRESH_KEY } from "../constants";

export function areTokensValid(): boolean {
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
    if (
      accessTokenExpiration === undefined ||
      refreshTokenExpiration === undefined
    ) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function isAccessTokenExpired(): boolean {
  const accessToken = Cookies.get(ACCESS_KEY);
  if (accessToken === undefined) {
    return true;
  }
  try {
    const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
    const accessTokenExpiration = decodedAccessToken.exp;
    const now = Date.now() / 1000;
    if (accessTokenExpiration === undefined) {
      return true;
    }
    if (accessTokenExpiration < now) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function isRefreshTokenExpired(): boolean {
  const refreshToken = Cookies.get(REFRESH_KEY);
  if (refreshToken === undefined) {
    return true;
  }
  try {
    const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
    const refreshTokenExpiration = decodedRefreshToken.exp;
    const now = Date.now() / 1000;
    if (refreshTokenExpiration === undefined) {
      return true;
    }
    if (refreshTokenExpiration < now) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
