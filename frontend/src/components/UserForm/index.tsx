import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../../assets/taskly-logo-big.png";
import { getUserAPI, loginAPI, registerAPI } from "../../API/userAPI";
import {
  LOGIN_PAGE_URL,
  REGISTER_PAGE_URL,
  TODAY_PAGE_URL,
} from "../../constants";
import validateUserFormInputs from "../../utils/validateUserFormInputs";

type FormProps = React.PropsWithChildren & {
  method: "LOGIN" | "REGISTER";
};

const UserForm = ({ method }: FormProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [rePasswordErrorMsg, setRePasswordErrorMsg] = useState("");
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");

  const ctaLabelText =
    method === "LOGIN" ? "New here?" : "Already have an account?";
  const ctaButtonText =
    method === "LOGIN" ? "Create a new account!" : "Login here!";

  const resetErrorStates = () => {
    setErrorMsg("");
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
    setRePasswordErrorMsg("");
    setFirstNameErrorMsg("");
    setLastNameErrorMsg("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    resetErrorStates();
    const {
      emailValidityError,
      firstNameValidityError,
      lastNameValidityError,
      passwordValidityError,
      rePasswordValidityError,
    } = validateUserFormInputs({
      email,
      password,
      firstName,
      lastName,
      rePassword,
    });

    const isLoginFormInvalid =
      emailValidityError !== "" || passwordValidityError !== "";
    const isRegisterFormInvalid =
      emailValidityError !== "" ||
      passwordValidityError !== "" ||
      rePasswordValidityError !== "" ||
      firstNameValidityError !== "" ||
      lastNameValidityError !== "";

    setIsLoading(true);
    try {
      if (method === "LOGIN") {
        if (isLoginFormInvalid) {
          setEmailErrorMsg(emailValidityError);
          setPasswordErrorMsg(passwordValidityError);
          return;
        }
        const [isSuccess, error] = await loginAPI(email, password);
        if (isSuccess) {
          // This is called just to save user info in localStorage so other comps can get that data wihout another API call
          await getUserAPI()
          navigate(TODAY_PAGE_URL);
        } else if (error) {
          setErrorMsg(error);
        }
      } else {
        if (isRegisterFormInvalid) {
          setEmailErrorMsg(emailValidityError);
          setPasswordErrorMsg(passwordValidityError);
          setRePasswordErrorMsg(rePasswordValidityError);
          setFirstNameErrorMsg(firstNameValidityError);
          setLastNameErrorMsg(lastNameValidityError);
          return;
        }
        const [isSuccess, error] = await registerAPI(
          email,
          password,
          firstName,
          lastName
        );
        if (isSuccess) {
          alert("Account successfully created! Please login to continue");
          navigate(LOGIN_PAGE_URL);
        } else if (error) {
          setErrorMsg(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = () => {
    if (method === "LOGIN") {
      navigate(REGISTER_PAGE_URL);
    } else {
      navigate(LOGIN_PAGE_URL);
    }
  };

  return (
    <div>
      <img src={logoImg} />
      {errorMsg === "" ? null : <p>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailErrorMsg === "" ? null : <p>{emailErrorMsg}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordErrorMsg === "" ? null : <p>{passwordErrorMsg}</p>}
        {method === "REGISTER" ? (
          <>
            <label htmlFor="re-password">Re-Type password</label>
            <input
              type="password"
              name="re-password"
              id="re-password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            {rePasswordErrorMsg === "" ? null : <p>{rePasswordErrorMsg}</p>}
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameErrorMsg === "" ? null : <p>{firstNameErrorMsg}</p>}
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameErrorMsg === "" ? null : <p>{lastNameErrorMsg}</p>}
          </>
        ) : (
          <></>
        )}
        <button type="submit">{isLoading ? "Loading..." : method}</button>
      </form>
      <label htmlFor="cta-button">{ctaLabelText}</label>
      <button id="cta-button" onClick={changePage}>
        {ctaButtonText}
      </button>
    </div>
  );
};

export default UserForm;
