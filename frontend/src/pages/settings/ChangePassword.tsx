import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";

const ChangePassword = () => {
  useDocumentTitle("Change Password");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="PASS_EDIT" selectedTag="" />
    </SC_MainViewContainer>
  );
};

export default ChangePassword;
