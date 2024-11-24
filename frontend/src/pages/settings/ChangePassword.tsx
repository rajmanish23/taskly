import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";
import SettingsForms from "../../components/SettingsForms";

const ChangePassword = () => {
  useDocumentTitle("Change Password");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="PASS_EDIT" selectedTag="" />
      <SettingsForms mode="EDIT_PASSWORD" />
    </SC_MainViewContainer>
  );
};

export default ChangePassword;
