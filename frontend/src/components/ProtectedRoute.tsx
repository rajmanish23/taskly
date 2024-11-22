import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  LOGIN_PAGE_URL,
  STYLE_TEXT_COLOR,
} from "../constants";
import { refreshSession } from "../API/isAuthorizedAPI";
import {
  areTokensValid,
  isAccessTokenExpired,
  isRefreshTokenExpired,
} from "../utils/tokenValidator";

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
        await refreshSession();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return true;
  };

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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <BarLoader
          color={STYLE_TEXT_COLOR}
          width={BAR_LOADER_WIDTH}
          height={BAR_LOADER_HEIGHT}
        />
      </div>
    );
  }

  return isAuth ? children : <Navigate to={LOGIN_PAGE_URL} />;
};

export default ProtectedRoute;
