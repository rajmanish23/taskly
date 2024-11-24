import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";

const RestoreDeleted = () => {
  useDocumentTitle("Restore");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="RESTORE" selectedTag="" />
    </SC_MainViewContainer>
  );
};

export default RestoreDeleted;
