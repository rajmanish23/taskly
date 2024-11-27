import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import {
  SC_BackgroundContainer,
  SC_CentralNoDataContainer,
  SC_DateContainer,
  SC_LeftAlignedViewBackgroundContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import { BarLoader } from "react-spinners";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_ICON_MARGINS,
  STYLE_TEXT_COLOR,
} from "../../constants";
import { getTaskDetailsAPI } from "../../API/tasksAPI";
import { isAPIErrorMessage } from "../../utils/objectTypeCheckers";
import ErrorMessage from "../ErrorMessage";
import { SC_BaseParagraph, SC_DateContainer } from "./styles";
import { AddEditButton } from "../AddEditButton";
import TaskDisplayCard from "../TaskDisplayCard";

type Props = {
  taskId?: string;
};

const displayDate = (date: Date | undefined) => {
  if (date === undefined) {
    return (
      <SC_DateContainer $isOverDue={false} $isNull={true}>
        <BsFillQuestionCircleFill style={STYLE_ICON_MARGINS} />
        <SC_BaseParagraph>No due date</SC_BaseParagraph>
      </SC_DateContainer>
    );
  }
  const isOverDue = date.getTime() < Date.now();
  return (
    <SC_DateContainer $isOverDue={isOverDue} $isNull={false}>
      {isOverDue ? (
        <PiWarningCircleFill style={STYLE_ICON_MARGINS} />
      ) : (
        <MdAccessTimeFilled style={STYLE_ICON_MARGINS} />
      )}
      <SC_BaseParagraph>{`${
        isOverDue ? "Overdue" : "Due at"
      }: ${date.toLocaleString(undefined, {
        hourCycle: "h12",
        hour: "numeric",
        minute: "numeric",
        dayPeriod: "narrow",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`}</SC_BaseParagraph>
    </SC_DateContainer>
  );
};

const TaskDetailsView = ({ taskId }: Props) => {
  const [taskData, setTaskData] = useState<Task>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTaskData = useCallback(async () => {
    setIsLoading(true);
    if (taskId === undefined)
      throw Error("!! Need to pass task ID to this component !!");
    try {
      const data = await getTaskDetailsAPI(taskId);
      if (isAPIErrorMessage(data)) {
        setErrorMessage(data.detail);
      } else {
        setTaskData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    getTaskData().catch((e) => {
      console.error(e);
      setIsLoading(false);
    });
  }, [getTaskData]);

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text="Viewing Task" editButtonText="Edit Task" />
      {isLoading ? (
        <SC_CentralNoDataContainer>
          <BarLoader
            height={BAR_LOADER_HEIGHT}
            width={BAR_LOADER_WIDTH}
            color={STYLE_TEXT_COLOR}
          />
        </SC_CentralNoDataContainer>
      ) : errorMessage !== "" ? (
        <SC_CentralNoDataContainer>
          <ErrorMessage errorMessage={errorMessage} />
        </SC_CentralNoDataContainer>
      ) : (
        <SC_LeftAlignedViewBackgroundContainer>
          <div>
            <div>
              <button>
                <FaCheckCircle />
              </button>
              <h1>{taskData?.name}</h1>
            </div>
            <button>
              <MdDelete />
            </button>
          </div>

          <div>{displayDate(taskData?.dueAt)}</div>

          <p>{taskData?.description}</p>

          <div>
            <h1>Tags:</h1>
            <ul>
              {taskData?.tags.map((each) => (
                <li key={each.sId}>{each.name}</li>
              ))}
            </ul>
            <AddEditButton mode="ADD" text="Add a tag" />
          </div>

          <div>
            <div>
              <h1>Sub Tasks</h1>
              <AddEditButton mode="ADD" text="Create a Sub task" />
            </div>
            <ul>
              {taskData?.subTasks.map((each) => (
                <TaskDisplayCard data={each} mode="TASK" />
              ))}
            </ul>
          </div>
        </SC_LeftAlignedViewBackgroundContainer>
      )}
    </SC_BackgroundContainer>
  );
};

export default TaskDetailsView;
