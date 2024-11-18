import { Navigate } from "react-router-dom";

import UserForm from "../components/UserForm";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { areTokensValid, isRefreshTokenExpired } from "../utils/tokenValidator";
import { TODAY_PAGE_URL } from "../constants";

const Login = () => {
  useDocumentTitle("Login");

  const isTokenValid = areTokensValid() && !isRefreshTokenExpired();

  if (isTokenValid) {
    return <Navigate to={TODAY_PAGE_URL} />;
  }
  return <UserForm method="LOGIN" />;
};

export default Login;
