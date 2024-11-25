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
  SC_LogoImg,
  SC_CTAContainer,
} from "./styles";
import ErrorMessage from "../ErrorMessage";
import { BarLoader } from "react-spinners";
import FormInput from "../FormInput";

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
          <FormInput
            changeEventHandler={(e) => setEmail(e.target.value)}
            errorMessage={emailErrorMsg}
            isError={emailErrorMsg !== ""}
            name="Email"
            type="text"
            value={email}
          />
          <FormInput
            changeEventHandler={(e) => setPassword(e.target.value)}
            errorMessage={passwordErrorMsg}
            isError={passwordErrorMsg !== ""}
            name="Password"
            type="password"
            value={password}
          />
          {method === "REGISTER" ? (
            <>
              <FormInput
                changeEventHandler={(e) => setRePassword(e.target.value)}
                errorMessage={rePasswordErrorMsg}
                isError={rePasswordErrorMsg !== ""}
                name="Confirm Password"
                type="password"
                value={rePassword}
              />
              <FormInput
                changeEventHandler={(e) => setFirstName(e.target.value)}
                errorMessage={firstNameErrorMsg}
                isError={firstNameErrorMsg !== ""}
                name="First Name"
                type="text"
                value={firstName}
              />
              <FormInput
                changeEventHandler={(e) => setLastName(e.target.value)}
                errorMessage={lastNameErrorMsg}
                isError={lastNameErrorMsg !== ""}
                name="Last Name"
                type="text"
                value={lastName}
              />
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
