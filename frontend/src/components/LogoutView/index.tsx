import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";

import { ACCESS_KEY, LOGIN_PAGE_URL, REFRESH_KEY, STYLE_ICON_MARGINS } from "../../constants";
import {
  SC_BackgroundContainer,
  SC_FormSubmitButton,
  SC_LeftAlignedViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import { SC_LogoutPara } from "./styles";

const LogoutView = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.clear();
    Cookies.remove(ACCESS_KEY);
    Cookies.remove(REFRESH_KEY);
    navigate(LOGIN_PAGE_URL);
  };

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text="Do you want to Logout?" />
      <SC_LeftAlignedViewBackgroundContainer>
        <SC_LogoutPara>
          Please click on the below button to logout of this device.
        </SC_LogoutPara>
        <SC_FormSubmitButton type="button" onClick={logoutHandler}>
          <RiLogoutBoxRFill style={STYLE_ICON_MARGINS} />
          Logout
        </SC_FormSubmitButton>
      </SC_LeftAlignedViewBackgroundContainer>
    </SC_BackgroundContainer>
  );
};

export default LogoutView;
