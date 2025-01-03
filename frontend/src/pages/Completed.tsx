import useDocumentTitle from "../hooks/useDocumentTitle";
import { SC_MainViewContainer } from "./styles";
import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";

const Completed = () => {
  useDocumentTitle("Completed");
  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" selectedView="COMPLETED" />
      <TasksListView mode="COMPLETED" />
    </SC_MainViewContainer>
  );
};

export default Completed;
