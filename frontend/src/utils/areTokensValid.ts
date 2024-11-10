import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { ACCESS_KEY, REFRESH_KEY } from "../constants";

export default function areTokensValid () : boolean {
  const accessToken = Cookies.get(ACCESS_KEY);
  const refreshToken = Cookies.get(REFRESH_KEY);
  if (accessToken === undefined || refreshToken === undefined) {
    return false
  }
  try {
    const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
    const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
    const accessTokenExpiration = decodedAccessToken.exp; // this will be in seconds
    const refreshTokenExpiration = decodedRefreshToken.exp;
    const now = Date.now() / 1000;
    if (
      accessTokenExpiration === undefined ||
      refreshTokenExpiration === undefined ||
      accessTokenExpiration < now ||
      refreshTokenExpiration < now
    )
    return false;
    return true;
  } catch (error) {
    console.error(error)
    return false
  }
}