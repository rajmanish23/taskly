import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_KEY, REFRESH_KEY } from "../constants";
import { jwtDecode, JwtPayload } from "jwt-decode";
import api from "../api";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const refreshSession = useCallback(async () => {
    const refreshToken = Cookies.get(REFRESH_KEY);
    if (refreshToken === undefined) {
      setIsAuth(false);
      return;
    }
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        Cookies.set(ACCESS_KEY, res.data.access, {
          sameSite: "Strict",
          secure: true,
        });
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      setIsAuth(false);
      console.error(error);
    }
  }, [setIsAuth]);

  const authorize = useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_KEY);
    const refreshToken = Cookies.get(REFRESH_KEY);
    if (accessToken === undefined || refreshToken === undefined) {
      setIsAuth(false);
      return;
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
        setIsAuth(false);
        return;
      } else if (accessTokenExpiration < now) {
        // if current expiration is less than current time so essentially already expired
        if (refreshTokenExpiration < now) {
          setIsAuth(false);
          return;
        }
        await refreshSession();
      } else {
        setIsAuth(true);
      }
    } catch (error) {
      setIsAuth(false);
      console.error(error);
    }
  }, [refreshSession]);

  useEffect(() => {
    authorize().catch(() => setIsAuth(false));
  }, [authorize]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
