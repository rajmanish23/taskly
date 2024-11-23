import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";

const EditEmail = () => {
  useDocumentTitle("Edit Email");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="EMAIL_EDIT" selectedTag="" />
    </SC_MainViewContainer>
  );
};

export default EditEmail;
