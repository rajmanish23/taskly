import { Navigate } from "react-router-dom";

import Form from "../components/Form";
import useDocumentTitle from "../hooks/useDocumentTitle";
import areTokensValid from "../utils/areTokensValid";

const Login = () => {
  useDocumentTitle("Login");

  const isTokenValid = areTokensValid()
  
  if (isTokenValid) {
    return <Navigate to="/" />;
  } 
  return <Form method="LOGIN" />;
};

export default Login;
