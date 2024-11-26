import useDocumentTitle from "../hooks/useDocumentTitle";
import { SC_MainViewContainer } from "./styles";
import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";

const Previous = () => {
  useDocumentTitle("Previous");
  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" selectedView="PREVIOUS" />
      <TasksListView mode="PREVIOUS" />
    </SC_MainViewContainer>
  );
};

export default Previous;
