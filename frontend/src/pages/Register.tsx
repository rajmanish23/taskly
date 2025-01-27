import { Navigate } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";
import UserForm from "../components/UserForm";
import { areTokensValid, isRefreshTokenExpired } from "../utils/tokenValidator";
import { TODAY_PAGE_URL } from "../constants";

const Register = () => {
  useDocumentTitle("Register");

  const isTokenValid = areTokensValid() && !isRefreshTokenExpired();

  if (isTokenValid) {
    return <Navigate to={TODAY_PAGE_URL} />;
  }
  return <UserForm method="REGISTER" />;
};

export default Register;
