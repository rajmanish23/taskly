import { FaCheckCircle } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

import {
  SC_TaskCompleteButton,
  SC_TaskListItemContainer,
  SC_DataContainer,
  SC_TaskItemHeaderContainer,
  SC_BaseParagraph,
} from "./styles";
import { isTask } from "../../utils/objectTypeCheckers";

type TaskDisplayCardProps = {
  data: Task | SubTask;
};

const TaskDisplayCard = ({ data }: TaskDisplayCardProps) => {
  if (isTask(data)) {
    return (
      <SC_TaskListItemContainer>
        <SC_TaskCompleteButton>
          <FaCheckCircle />
        </SC_TaskCompleteButton>
        <SC_DataContainer>
          <SC_TaskItemHeaderContainer>
            <SC_BaseParagraph>{data.name}</SC_BaseParagraph>
            <div>
              <MdAccessTimeFilled />
              <SC_BaseParagraph>
                Due: {data.dueAt.toLocaleString()}
              </SC_BaseParagraph>
            </div>
          </SC_TaskItemHeaderContainer>

          <ul>
            {data.tags.map((each) => (
              <li key={each.sId}>{each.name}</li>
            ))}
          </ul>

          <SC_BaseParagraph>{data.description}</SC_BaseParagraph>

          <ul>
            {data.subTasks.map((each) => (
              <li key={each.sId}>
                <SC_BaseParagraph>{each.name}</SC_BaseParagraph>
                <div>
                  <MdAccessTimeFilled />
                  <SC_BaseParagraph>
                    Due: {each.dueAt.toLocaleString()}
                  </SC_BaseParagraph>
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
