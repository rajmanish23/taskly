import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";

const DeleteAccount = () => {
  useDocumentTitle("Delete Account");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="DEL_ACC" selectedTag="" />
    </SC_MainViewContainer>
  );
};

export default DeleteAccount;
