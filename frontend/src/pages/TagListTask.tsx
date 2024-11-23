// import SideBar from "../components/SideBar";
import TasksListView from "../components/TasksListView";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useParams } from "react-router-dom";
import { SC_MainViewContainer } from "./styles";
import SideBar from "../components/SideBar";

const TagListTask = () => {
  useDocumentTitle("Tag List task thing");

  const { tagId } = useParams();

  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" selectedView="TAG" selectedTag={tagId} />
      <TasksListView mode="TAG" tagId={tagId} />
    </SC_MainViewContainer>
  );
};

export default TagListTask;
