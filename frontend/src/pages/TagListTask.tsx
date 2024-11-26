import { useParams } from "react-router-dom";

import TasksListView from "../components/TasksListView";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { SC_MainViewContainer } from "./styles";
import SideBar from "../components/SideBar";

const TagListTask = () => {
  const { tagId } = useParams();

  useDocumentTitle("Tag");

  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" selectedView="TAG" selectedTag={tagId} />
      <TasksListView mode="TAG" tagId={tagId} />
    </SC_MainViewContainer>
  );
};

export default TagListTask;
