import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaHashtag } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BarLoader } from "react-spinners";

import {
  SC_BackgroundContainer,
  SC_CentralNoDataContainer,
  SC_DateContainer,
  SC_EmptyDisplayHeader,
  SC_LeftAlignedViewBackgroundContainer,
  SC_TagItemContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_ICON_MARGINS,
  STYLE_TEXT_COLOR,
} from "../../constants";
import { getTaskDetailsAPI } from "../../API/tasksAPI";
import { isAPIErrorMessage } from "../../utils/objectTypeCheckers";
import ErrorMessage from "../ErrorMessage";
import {
  SC_BaseParagraph,
  SC_Button,
  SC_DateAlignmentContainer,
  SC_DeleteButton,
  SC_DescriptionPara,
  SC_DescriptionParaSpan,
  SC_HeadContainer,
  SC_SubTaskContainer,
  SC_SubTaskHeadingContainer,
  SC_TagsContainer,
  SC_SubHeading,
  SC_TagsListContainer,
  SC_TaskNameHeading,
  SC_TopTextContainer,
  SC_SubTasksListContainer,
} from "./styles";
import { AddEditButton } from "../AddEditButton";
import TaskDisplayCard from "../TaskDisplayCard";
import isColorDark from "../../utils/isColorDark";

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
      <ViewHeader
        h1Text="Viewing Task"
        editButtonText="Edit Task"
        hasBackButton
      />
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
          <SC_HeadContainer>
            <SC_TopTextContainer>
              <SC_Button>
                <FaCheckCircle />
              </SC_Button>
              <SC_TaskNameHeading>{taskData?.name}</SC_TaskNameHeading>
            </SC_TopTextContainer>
            <SC_DeleteButton>
              <MdDelete />
            </SC_DeleteButton>
          </SC_HeadContainer>

          <SC_DateAlignmentContainer>
            {displayDate(taskData?.dueAt)}
          </SC_DateAlignmentContainer>

          <SC_DescriptionPara>
            <SC_DescriptionParaSpan>Description: </SC_DescriptionParaSpan>
            {taskData?.description}
          </SC_DescriptionPara>

          <SC_TagsContainer>
            <SC_SubHeading>Tags:</SC_SubHeading>
            <SC_TagsListContainer>
              {taskData?.tags.map((each) => (
                <SC_TagItemContainer
                  key={each.sId}
                  $color={each.colorHex}
                  $isColorDark={isColorDark(each.colorHex)}
                >
                  <FaHashtag style={STYLE_ICON_MARGINS} />
                  {each.name}
                </SC_TagItemContainer>
              ))}
            </SC_TagsListContainer>
            <AddEditButton mode="ADD" text="Add a tag" />
          </SC_TagsContainer>

          <SC_SubTaskContainer>
            <SC_SubTaskHeadingContainer>
              <SC_SubHeading>Sub Tasks</SC_SubHeading>
              <AddEditButton mode="ADD" text="Create a Sub task" />
            </SC_SubTaskHeadingContainer>
            {taskData?.subTasks.length !== 0 ? (
              <SC_SubTasksListContainer>
                {taskData?.subTasks.map((each) => (
                  <TaskDisplayCard data={each} mode="TASK" />
                ))}
              </SC_SubTasksListContainer>
            ) : (
              <SC_CentralNoDataContainer>
                <>
                  <SC_EmptyDisplayHeader>
                    Create a sub task to divide your task and be more
                    productive!
                  </SC_EmptyDisplayHeader>
                  <AddEditButton text="Create a Sub Task" mode="ADD" />
                </>
              </SC_CentralNoDataContainer>
            )}
          </SC_SubTaskContainer>
        </SC_LeftAlignedViewBackgroundContainer>
      )}
    </SC_BackgroundContainer>
  );
};

export default TaskDetailsView;
