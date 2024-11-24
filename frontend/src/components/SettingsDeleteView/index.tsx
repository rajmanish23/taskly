import { useState } from "react";
import { BarLoader } from "react-spinners";

import {
  SC_BackgroundContainer,
  SC_SettingsViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_ICON_MARGINS,
  STYLE_TEXT_COLOR,
} from "../../constants";
import ErrorMessage from "../ErrorMessage";
import { SC_DeleteButton, SC_DeleteViewPara } from "./styles";
import { MdDelete } from "react-icons/md";

const SettingsDeleteView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text="Delete your account?" />
      <SC_SettingsViewBackgroundContainer>
        {isError ? (
          <ErrorMessage errorMessage="It seems we are encountering some issues while deleting your account. Please try again later." />
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
          Please proceed with your account deletion only if you accept the facts
          stated above.
        </SC_DeleteViewPara>
        <SC_DeleteButton>
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
