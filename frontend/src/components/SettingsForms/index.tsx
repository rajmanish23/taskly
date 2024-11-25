import { FormEvent, useState } from "react";
import {
  SC_BackgroundContainer,
  SC_SettingsViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import validateUserFormInputs from "../../utils/validateUserFormInputs";
import { BarLoader } from "react-spinners";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_TEXT_COLOR,
} from "../../constants";

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

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e: FormEvent) => {
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
      firstNameValidityError !== "" && lastNameValidityError !== "";
    const isEmailInvalid = emailValidityError === "";
    const isNewPasswordInvalid =
      passwordValidityError === "" && rePasswordValidityError === "";

    setIsLoading(true);
    try {
      switch (mode) {
        case "EDIT_NAME":
          if (isNameInvalid) {
            setFirstNameError(firstNameValidityError);
            setLastNameError(lastNameValidityError);
            return;
          }
          // call name change api
          break;
        case "EDIT_EMAIL":
          if (isEmailInvalid) {
            setNewEmailError(emailValidityError);
            return;
          }
          // call email change api
          break;
        case "EDIT_PASSWORD":
          if (isNewPasswordInvalid) {
            setNewPasswordError(passwordValidityError);
            setReNewPasswordError(rePasswordValidityError);
            return;
          }
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text={getHeaderText()} />
      <SC_SettingsViewBackgroundContainer>
        <form onSubmit={handleSubmit}>
          {mode === "EDIT_NAME" ? (
            <>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {mode === "EDIT_EMAIL" ? (
            <>
              <div>
                <label htmlFor="newEmail">New Email</label>
                <input
                  type="text"
                  id="newEmail"
                  name="newEmail"
                  value={newEmail}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {mode === "EDIT_PASSWORD" ? (
            <>
              <div>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type="text"
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="text"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                />
              </div>
              <div>
                <label htmlFor="reNewPassword">Confirm New Password</label>
                <input
                  type="text"
                  id="reNewPassword"
                  name="reNewPassword"
                  value={reNewPassword}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <button type="submit">
            {isLoading ? (
              <BarLoader
                height={BAR_LOADER_HEIGHT}
                width={BAR_LOADER_WIDTH}
                color={STYLE_TEXT_COLOR}
              />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </SC_SettingsViewBackgroundContainer>
    </SC_BackgroundContainer>
  );
};

export default SettingsForms;
