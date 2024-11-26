import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";
import SettingsForms from "../../components/SettingsForms";

const EditName = () => {
  useDocumentTitle("Edit Name");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="NAME_EDIT" />
      <SettingsForms mode="EDIT_NAME" />
    </SC_MainViewContainer>
  );
};

export default EditName;
