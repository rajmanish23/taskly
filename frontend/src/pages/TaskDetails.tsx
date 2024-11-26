import useDocumentTitle from "../hooks/useDocumentTitle";
import { useParams } from "react-router-dom";
import { SC_MainViewContainer } from "./styles";
import SideBar from "../components/SideBar";

const TaskDetails = () => {
  useDocumentTitle("Task thing");

  const { taskId } = useParams();

  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" selectedView="TASK" />
      {taskId}
    </SC_MainViewContainer>
  );
};

export default TaskDetails;
