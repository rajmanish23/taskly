import useDocumentTitle from "../hooks/useDocumentTitle";
import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";
import { SC_MainViewContainer } from "./styles";

const Today = () => {
  useDocumentTitle("Today");

  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" selectedView="TODAY" selectedTag="" />
      <TasksListView mode="TODAY" />
    </SC_MainViewContainer>
  );
};

export default Today;
