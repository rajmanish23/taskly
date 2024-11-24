import { ChangeEvent, useState } from "react";
import { BarLoader } from "react-spinners";

import {
  SC_BackgroundContainer,
  SC_SettingsViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  DELETE_CHALLENGE_TEXT,
  LOGIN_PAGE_URL,
  STYLE_ICON_MARGINS,
  STYLE_TEXT_COLOR,
} from "../../constants";
import ErrorMessage from "../ErrorMessage";
import {
  SC_DeleteButton,
  SC_DeleteTextChallenge,
  SC_DeleteViewPara,
} from "./styles";
import { MdDelete } from "react-icons/md";
import { deleteUserAPI } from "../../API/userAPI";
import { useNavigate } from "react-router-dom";

const SettingsDeleteView = () => {
  const [deleteText, setDeleteText] = useState<string>("");
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleDeleteChallenge = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null) {
      setDeleteText(e.target.value);
      if (e.target.value === DELETE_CHALLENGE_TEXT) {
        setIsDeleteButtonDisabled(false);
      } else {
        setIsDeleteButtonDisabled(true);
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const status = await deleteUserAPI();
      if (status === "") {
        navigate(LOGIN_PAGE_URL);
        return;
      }
      setErrorMessage(status);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text="Delete your account?" />
      <SC_SettingsViewBackgroundContainer>
        {errorMessage !== "" ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : (
          <></>
        )}
        <SC_DeleteViewPara>
          Please remember that this action is permanent and cannot be reversed.
          Deleting your account will delete all the data you have made. That
          means any Tasks, Sub Tasks, Tags, your profile data, etc. Once
          deleted, there is no way to recover your data as it is immediately
          wiped from our servers to respect your privacy.
        </SC_DeleteViewPara>
        <SC_DeleteViewPara>
          Please type "{DELETE_CHALLENGE_TEXT}" if you wish to permanently
          delete your account.
        </SC_DeleteViewPara>
        <SC_DeleteTextChallenge
          type="text"
          value={deleteText}
          onChange={handleDeleteChallenge}
          placeholder={`Type "${DELETE_CHALLENGE_TEXT}" here to continue.`}
        />
        <SC_DeleteButton
          $isDisabled={isDeleteButtonDisabled}
          disabled={isDeleteButtonDisabled}
          onClick={handleDelete}
        >
          {isLoading ? (
            <BarLoader
              height={BAR_LOADER_HEIGHT}
              width={BAR_LOADER_WIDTH}
              color={STYLE_TEXT_COLOR}
            />
          ) : (
            <>
              <MdDelete style={STYLE_ICON_MARGINS} />
              Permanently delete my account
            </>
          )}
        </SC_DeleteButton>
      </SC_SettingsViewBackgroundContainer>
    </SC_BackgroundContainer>
  );
};

export default SettingsDeleteView;
