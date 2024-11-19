// import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useParams } from "react-router-dom";

const TagListTask = () => {
  useDocumentTitle("Tag List task thing");

  const { tagId } = useParams();
  console.log(tagId);

  return (
    <>
      <div>Tag list task</div>
      {/* <SideBar mode="NORMAL" /> */}
      <TasksListView mode="TAG" />
    </>
  );
};

export default TagListTask;
