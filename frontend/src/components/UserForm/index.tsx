import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../../assets/taskly-logo-big.png";
import { getUserAPI, loginAPI, registerAPI } from "../../API/userAPI";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  LOGIN_PAGE_URL,
  REGISTER_PAGE_URL,
  STYLE_TEXT_COLOR,
  TODAY_PAGE_URL,
} from "../../constants";
import validateUserFormInputs from "../../utils/validateUserFormInputs";
import {
  SC_BackgroundContainer,
  SC_CTAButton,
  SC_CTALabel,
  SC_FormCardContainer,
  SC_FormInputContainer,
  SC_FormSubmitButton,
  SC_FormInputLabel,
  SC_LogoImg,
  SC_FormInput,
  SC_ErrorText,
  SC_CTAContainer,
} from "./styles";
import ErrorMessage from "../ErrorMessage";
import { BarLoader } from "react-spinners";

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
          // This is called just to save user info in sessionStorage so other comps can get that data wihout another API call
          await getUserAPI();
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
    <SC_BackgroundContainer>
      <SC_FormCardContainer>
        <SC_LogoImg src={logoImg} />
        {errorMsg === "" ? null : <ErrorMessage errorMessage={errorMsg} />}
        <SC_FormInputContainer onSubmit={handleSubmit}>
          <SC_FormInputLabel htmlFor="email" $isError={emailErrorMsg !== ""}>
            Email
          </SC_FormInputLabel>
          <SC_FormInput
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            $isError={emailErrorMsg !== ""}
          />
          {emailErrorMsg === "" ? null : (
            <SC_ErrorText>{"* " + emailErrorMsg}</SC_ErrorText>
          )}
          <SC_FormInputLabel
            htmlFor="password"
            $isError={passwordErrorMsg !== ""}
          >
            Password
          </SC_FormInputLabel>
          <SC_FormInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            $isError={passwordErrorMsg !== ""}
          />
          {passwordErrorMsg === "" ? null : (
            <SC_ErrorText>{"* " + passwordErrorMsg}</SC_ErrorText>
          )}
          {method === "REGISTER" ? (
            <>
              <SC_FormInputLabel
                htmlFor="re-password"
                $isError={rePasswordErrorMsg !== ""}
              >
                Confirm password
              </SC_FormInputLabel>
              <SC_FormInput
                type="password"
                name="re-password"
                id="re-password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                $isError={rePasswordErrorMsg !== ""}
              />
              {rePasswordErrorMsg === "" ? null : (
                <SC_ErrorText>{"* " + rePasswordErrorMsg}</SC_ErrorText>
              )}
              <SC_FormInputLabel
                htmlFor="first-name"
                $isError={firstNameErrorMsg !== ""}
              >
                First Name
              </SC_FormInputLabel>
              <SC_FormInput
                type="text"
                name="first-name"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                $isError={firstNameErrorMsg !== ""}
              />
              {firstNameErrorMsg === "" ? null : (
                <SC_ErrorText>{"* " + firstNameErrorMsg}</SC_ErrorText>
              )}
              <SC_FormInputLabel
                htmlFor="last-name"
                $isError={lastNameErrorMsg !== ""}
              >
                Last Name
              </SC_FormInputLabel>
              <SC_FormInput
                type="text"
                name="last-name"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                $isError={lastNameErrorMsg !== ""}
              />
              {lastNameErrorMsg === "" ? null : (
                <SC_ErrorText>{"* " + lastNameErrorMsg}</SC_ErrorText>
              )}
            </>
          ) : (
            <></>
          )}
          <SC_FormSubmitButton type="submit">
            {isLoading ? (
              <BarLoader
                color={STYLE_TEXT_COLOR}
                height={BAR_LOADER_HEIGHT}
                width={BAR_LOADER_WIDTH}
              />
            ) : (
              method
            )}
          </SC_FormSubmitButton>
        </SC_FormInputContainer>
        <SC_CTAContainer>
          <SC_CTALabel htmlFor="cta-button">{ctaLabelText}</SC_CTALabel>
          <SC_CTAButton id="cta-button" onClick={changePage}>
            {ctaButtonText}
          </SC_CTAButton>
        </SC_CTAContainer>
      </SC_FormCardContainer>
    </SC_BackgroundContainer>
  );
};

export default UserForm;
