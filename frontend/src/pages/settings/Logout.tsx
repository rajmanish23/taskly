import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";
import LogoutView from "../../components/LogoutView";

const Logout = () => {
  useDocumentTitle("Logout");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="LOGOUT" />
      <LogoutView />
    </SC_MainViewContainer>
  );
};

export default Logout;
