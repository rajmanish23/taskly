import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import RestoreDeletedView from "../../components/RestoreDeletedView";
import { SC_MainViewContainer } from "../styles";

const RestoreDeleted = () => {
  useDocumentTitle("Restore");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="RESTORE" />
      <RestoreDeletedView />
    </SC_MainViewContainer>
  );
};

export default RestoreDeleted;
