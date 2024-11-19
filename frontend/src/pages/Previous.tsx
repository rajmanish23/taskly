// import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Previous = () => {
  useDocumentTitle("Previous");

  return (
    <>
      <div>Previous</div>
      {/* <SideBar mode="NORMAL" /> */}
      <TasksListView mode="PREVIOUS" />
    </>
  );
};

export default Previous;
