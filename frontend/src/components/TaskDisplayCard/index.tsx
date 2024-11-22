import { FaCheckCircle } from "react-icons/fa";

import {
  SC_TaskCompleteButton,
  SC_TaskListItemContainer,
  SC_DataContainer,
  SC_TaskItemHeaderContainer,
} from "./styles";

type TaskDisplayCardProps = {
  data: Task | SubTask;
};

const TaskDisplayCard = ({ data }: TaskDisplayCardProps) => {
  const taskDueAt = new Date(data.dueAt);
  if (isTask(data)) {
  return (
    <SC_TaskListItemContainer>
      <SC_TaskCompleteButton>
        <FaCheckCircle />
      </SC_TaskCompleteButton>
      <SC_DataContainer>
        <SC_TaskItemHeaderContainer>
          <p>{data.name}</p>
          <div>
            <p>Due: {taskDueAt.toLocaleString()}</p>
          </div>
        </SC_TaskItemHeaderContainer>

        <ul>
          {data.tags.map((each) => (
            <li key={each.sId}>{each.name}</li>
          ))}
        </ul>

        <p>{data.description}</p>

        <ul>
          {data.subTasks.map((each) => (
            <li key={each.sId}>
              <p>{each.name}</p>
              <div>
                <p>Due: {each.dueAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </SC_DataContainer>
    </SC_TaskListItemContainer>
  );
  } else {
    return <></>;
  }
};

export default TaskDisplayCard;
