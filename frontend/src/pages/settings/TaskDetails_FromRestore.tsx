import { useParams } from "react-router-dom";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import { SC_MainViewContainer } from "../styles";
import SideBar from "../../components/SideBar";
import TaskDetailsView from "../../components/TaskDetailsView";

const TaskDetails_FromRestore = () => {
  useDocumentTitle("Task Details");

  const { taskId } = useParams();

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="RESTORE" />
      <TaskDetailsView taskId={taskId} />
    </SC_MainViewContainer>
  );
};

export default TaskDetails_FromRestore;
