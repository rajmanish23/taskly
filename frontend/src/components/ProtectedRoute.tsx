import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { refreshSession } from "../API/isAuthorizedAPI";
import { LOGIN_PAGE_URL } from "../constants";
import {areTokensValid, isAccessTokenExpired, isRefreshTokenExpired} from "../utils/tokenValidator";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const isAuthorized = async () => {
    if (!areTokensValid()) {
      return false;
    }
    if (isRefreshTokenExpired()) {
      return false;
    }
    if (isAccessTokenExpired()) {
      try {
        await refreshSession()
        return true;
      } catch (error) {
        console.log(error)
        return false;
      }
    }
    return true;
  }

  const checkIfLoggedIn = useCallback(async () => {
    const res = await isAuthorized();
    setIsAuth(res);
  }, [setIsAuth]);

  useEffect(() => {
    checkIfLoggedIn().catch((e) => {
      console.log(e);
      setIsAuth(false);
    });
  }, [checkIfLoggedIn]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : <Navigate to={LOGIN_PAGE_URL} />;
};

export default ProtectedRoute;
