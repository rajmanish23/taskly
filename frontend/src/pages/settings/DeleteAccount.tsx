import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";
import SettingsDeleteView from "../../components/SettingsDeleteView";

const DeleteAccount = () => {
  useDocumentTitle("Delete Account");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="DEL_ACC" selectedTag="" />
      <SettingsDeleteView />
    </SC_MainViewContainer>
  );
};

export default DeleteAccount;
