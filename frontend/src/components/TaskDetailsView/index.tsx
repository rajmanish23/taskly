import { SC_BackgroundContainer } from "../commonStyles";
import ViewHeader from "../ViewHeader";

type Props = {
  taskId?: string;
};

const TaskDetailsView = ({ taskId }: Props) => {
  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text="Viewing Task" editButtonText="Edit Task" />
    </SC_BackgroundContainer>
  );
};

export default TaskDetailsView;
