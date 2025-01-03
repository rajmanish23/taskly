import { FormEvent, useState, useEffect, useCallback, useContext } from "react";
import { BarLoader } from "react-spinners";
import { GrUpdate } from "react-icons/gr";

import {
  SC_BackgroundContainer,
  SC_FormSubmitButton,
  SC_LeftAlignedViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import validateUserFormInputs from "../../utils/validateUserFormInputs";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_ICON_MARGINS,
  STYLE_TEXT_COLOR,
} from "../../constants";
import FormInput from "../FormInput";
import { SC_FormContainer } from "./styles";
import {
  getUserAPI,
  updateEmailAPI,
  updateNameAPI,
  updatePasswordAPI,
} from "../../API/userAPI";
import ErrorMessage from "../ErrorMessage";
import { UpdateContext, UpdateContextType } from "../../context/UpdateContext";

type Props = {
  mode: "EDIT_NAME" | "EDIT_EMAIL" | "EDIT_PASSWORD";
};

const SettingsForms = ({ mode }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [reNewPasswordError, setReNewPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { incrementUpdate } = useContext(UpdateContext) as UpdateContextType;

  const getHeaderText = () => {
    switch (mode) {
      case "EDIT_NAME":
        return "Change your name";
      case "EDIT_EMAIL":
        return "Change your E-Mail";
      case "EDIT_PASSWORD":
        return "Change your password";
    }
  };

  const resetErrorStates = () => {
    setFirstNameError("");
    setLastNameError("");
    setNewEmailError("");
    setOldPasswordError("");
    setReNewPasswordError("");
    setNewPasswordError("");
  };

  const resetInputStates = () => {
    setFirstName("");
    setLastName("");
    setNewEmail("");
    setOldPassword("");
    setNewPassword("");
    setReNewPassword("");
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
      email: newEmail,
      firstName,
      lastName,
      password: newPassword,
      rePassword: reNewPassword,
    });
    const isNameInvalid =
      firstNameValidityError !== "" || lastNameValidityError !== "";
    const isEmailInvalid = emailValidityError !== "";
    const isNewPasswordInvalid =
      passwordValidityError !== "" || rePasswordValidityError !== "";
    const isOldPasswordInvalid = oldPassword === "";

    setIsLoading(true);
    try {
      if (isOldPasswordInvalid) {
        setOldPasswordError(
          `Please enter your ${
            mode === "EDIT_PASSWORD" ? "old password" : "password"
          }`
        );
      }
      let status: APIStatusMessage;
      // TODO: Add Toasts instead of alerts
      switch (mode) {
        case "EDIT_NAME":
          if (isNameInvalid) {
            setFirstNameError(firstNameValidityError);
            setLastNameError(lastNameValidityError);
            return;
          }
          status = await updateNameAPI(firstName, lastName, oldPassword);
          if (status.isError) {
            setApiError(status.detail);
            return;
          }
          // alert("Updated your name");
          break;
        case "EDIT_EMAIL":
          if (isEmailInvalid) {
            setNewEmailError(emailValidityError);
            return;
          }
          status = await updateEmailAPI(newEmail, oldPassword);
          if (status.isError) {
            setApiError(status.detail);
            return;
          }
          // alert("Updated your email");
          break;
        case "EDIT_PASSWORD":
          if (isNewPasswordInvalid) {
            setNewPasswordError(passwordValidityError);
            setReNewPasswordError(rePasswordValidityError);
            return;
          }
          status = await updatePasswordAPI(oldPassword, newPassword);
          if (status.isError) {
            setApiError(status.detail);
            return;
          }
          // alert("Updated your password");
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      sessionStorage.clear();
      resetInputStates();
      incrementUpdate();
      setIsLoading(false);
    }
  };

  const getUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await getUserAPI();
      setFirstName(user.firstName);
      setLastName(user.lastName);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserDetails().catch((e) => console.log(e));
  }, [getUserDetails]);

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text={getHeaderText()} />
      <SC_LeftAlignedViewBackgroundContainer>
        {apiError === "" ? (
          <></>
        ) : (
          <ErrorMessage errorMessage={apiError} isDismissable={false} />
        )}
        <SC_FormContainer onSubmit={handleSubmit}>
          {mode === "EDIT_NAME" ? (
            <>
              <FormInput
                changeEventHandler={(e) => setFirstName(e.target.value)}
                value={firstName}
                errorMessage={firstNameError}
                isError={firstNameError !== ""}
                name="First Name"
                type="text"
              />
              <FormInput
                changeEventHandler={(e) => setLastName(e.target.value)}
                value={lastName}
                errorMessage={lastNameError}
                isError={lastNameError !== ""}
                name="Last Name"
                type="text"
              />
            </>
          ) : (
            <></>
          )}
          {mode === "EDIT_EMAIL" ? (
            <>
              <FormInput
                changeEventHandler={(e) => setNewEmail(e.target.value)}
                value={newEmail}
                errorMessage={newEmailError}
                isError={newEmailError !== ""}
                name="New Email"
                type="text"
              />
            </>
          ) : (
            <></>
          )}
          <FormInput
            changeEventHandler={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            errorMessage={oldPasswordError}
            isError={oldPasswordError !== ""}
            name={mode === "EDIT_PASSWORD" ? "Old Password" : "Password"}
            type="password"
          />
          {mode === "EDIT_PASSWORD" ? (
            <>
              <FormInput
                changeEventHandler={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                errorMessage={newPasswordError}
                isError={newPasswordError !== ""}
                name="New Password"
                type="password"
              />
              <FormInput
                changeEventHandler={(e) => setReNewPassword(e.target.value)}
                value={reNewPassword}
                errorMessage={reNewPasswordError}
                isError={reNewPasswordError !== ""}
                name="Confirm New Password"
                type="password"
              />
            </>
          ) : (
            <></>
          )}
          <SC_FormSubmitButton type="submit">
            {isLoading ? (
              <BarLoader
                height={BAR_LOADER_HEIGHT}
                width={BAR_LOADER_WIDTH}
                color={STYLE_TEXT_COLOR}
              />
            ) : (
              <>
                <GrUpdate style={STYLE_ICON_MARGINS} />
                Update
              </>
            )}
          </SC_FormSubmitButton>
        </SC_FormContainer>
      </SC_LeftAlignedViewBackgroundContainer>
    </SC_BackgroundContainer>
  );
};

export default SettingsForms;
