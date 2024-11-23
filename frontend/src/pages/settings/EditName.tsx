import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";

const EditName = () => {
  useDocumentTitle("Edit Name");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="NAME_EDIT" selectedTag="" />
    </SC_MainViewContainer>
  );
};

export default EditName;
