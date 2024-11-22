import useDocumentTitle from "../hooks/useDocumentTitle";
import { SC_MainViewContainer } from "./styles";
import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";

const Upcoming = () => {
  useDocumentTitle("Upcoming");
  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" selectedView="UPCOMING" selectedTag="" />
      <TasksListView mode="UPCOMING" />
    </SC_MainViewContainer>
  );
};

export default Upcoming;
