import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";
import SettingsForms from "../../components/SettingsForms";

const EditEmail = () => {
  useDocumentTitle("Edit Email");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="EMAIL_EDIT" />
      <SettingsForms mode="EDIT_EMAIL" />
    </SC_MainViewContainer>
  );
};

export default EditEmail;
