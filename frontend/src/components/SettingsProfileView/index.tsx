import { useEffect, useState, useCallback } from "react";
import { BarLoader } from "react-spinners";

import profileImg from "../../assets/default-profile.jpg";

import { getUserAPI } from "../../API/userAPI";
import {
  SC_BackgroundContainer,
  SC_CentralNoDataContainer,
  SC_SettingsViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_TEXT_COLOR,
} from "../../constants";
import ErrorMessage from "../ErrorMessage";
import { SC_ProfileHeaderContainer, SC_ProfileImage, SC_ProfileName } from "./styles";

const SettingsProfileView = () => {
  const [userDetails, setUserDetails] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await getUserAPI();
      setUserDetails(user);
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
      <ViewHeader h1Text="Profile" />
      {isLoading ? (
        <SC_CentralNoDataContainer>
          <BarLoader
            color={STYLE_TEXT_COLOR}
            height={BAR_LOADER_HEIGHT}
            width={BAR_LOADER_WIDTH}
          />
        </SC_CentralNoDataContainer>
      ) : userDetails === undefined ? (
        <SC_CentralNoDataContainer>
          <ErrorMessage errorMessage="We could not fetch your profile details. Please try again later." />
        </SC_CentralNoDataContainer>
      ) : (
        <SC_SettingsViewBackgroundContainer>
          <SC_ProfileHeaderContainer>
            <SC_ProfileImage src={profileImg} />
            <SC_ProfileName>{userDetails.fullName}</SC_ProfileName>
          </SC_ProfileHeaderContainer>
          <div>
            <p>Email</p>
            <p>{userDetails.email}</p>
          </div>
        </SC_SettingsViewBackgroundContainer>
      )}
    </SC_BackgroundContainer>
  );
};

export default SettingsProfileView;