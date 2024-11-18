// import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Today = () => {
  useDocumentTitle("Today");

  return (
    <>
      <div>Today</div>
      {/* <SideBar mode="NORMAL" /> */}
      <TasksListView mode="TODAY"/>
    </>
);
};

export default Today;
