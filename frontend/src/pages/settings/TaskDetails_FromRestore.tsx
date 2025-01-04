import { useParams } from "react-router-dom";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import { SC_MainViewContainer } from "../styles";
import SideBar from "../../components/SideBar";
import TaskDetailsView from "../../components/TaskDetailsView";
import { SETTING_RESTORE_URL } from "../../constants";

const TaskDetails_FromRestore = () => {
  useDocumentTitle("Task Details");

  const { taskId } = useParams();

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="RESTORE" />
      <TaskDetailsView taskId={taskId} previousPage={SETTING_RESTORE_URL} />
    </SC_MainViewContainer>
  );
};

export default TaskDetails_FromRestore;
