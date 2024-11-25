import Cookies from "js-cookie";
import { ACCESS_KEY, LOGIN_PAGE_URL, REFRESH_KEY } from "../../constants";
import { useNavigate } from "react-router-dom";
import {
  SC_BackgroundContainer,
  SC_FormSubmitButton,
  SC_SettingsViewPara,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";

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
      <SC_SettingsViewPara>
        Please click on the below button to logout of this device.
      </SC_SettingsViewPara>
      <SC_FormSubmitButton type="button" onClick={logoutHandler}>
        Logout
      </SC_FormSubmitButton>
    </SC_BackgroundContainer>
  );
};

export default LogoutView;
