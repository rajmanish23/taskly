import { Navigate } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle"
import Form from "../components/Form";
import areTokensValid from "../utils/areTokensValid";

const Register = () => {
  useDocumentTitle("Register")

  const isTokenValid = areTokensValid();

  if (isTokenValid) {
    return <Navigate to="/" />;
  }
  return <Form method="REGISTER" />;
}

export default Register