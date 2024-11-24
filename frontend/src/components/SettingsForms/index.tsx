import { useState } from "react";
import {
  SC_BackgroundContainer,
  SC_SettingsViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";

type Props = {
  mode: "EDIT_NAME" | "EDIT_EMAIL" | "EDIT_PASSWORD";
};

const SettingsForms = ({ mode }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

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

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text={getHeaderText()} />
      <SC_SettingsViewBackgroundContainer>
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
              <label htmlFor="oldEmail">Old Email</label>
              <input
                type="text"
                id="oldEmail"
                name="oldEmail"
                value={oldEmail}
              />
            </div>
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
      </SC_SettingsViewBackgroundContainer>
    </SC_BackgroundContainer>
  );
};

export default SettingsForms;
