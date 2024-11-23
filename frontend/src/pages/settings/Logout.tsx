import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";

const Logout = () => {
  useDocumentTitle("Logout");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="LOGOUT" selectedTag="" />
    </SC_MainViewContainer>
  );
};

export default Logout;
