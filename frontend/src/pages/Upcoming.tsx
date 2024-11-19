// import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Upcoming = () => {
  useDocumentTitle("Upcoming");

  return (
    <>
      <div>Upcoming</div>
      {/* <SideBar mode="NORMAL" /> */}
      <TasksListView mode="UPCOMING" />
    </>
  );
};

export default Upcoming;
