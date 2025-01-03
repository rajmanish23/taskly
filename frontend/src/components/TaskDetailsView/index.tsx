import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHashtag } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { PiWarningCircleFill } from "react-icons/pi";
import {
  MdAccessTimeFilled,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
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
  TAG_PAGE_URL_NO_PARAM,
} from "../../constants";
import { getTaskDetailsAPI } from "../../API/tasksAPI";
import { isAPIStatusMessage } from "../../utils/objectTypeCheckers";
import ErrorMessage from "../ErrorMessage";
import {
  SC_BaseParagraph,
  SC_Button,
  SC_DateAlignmentContainer,
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
  SC_SubTaskListItemContainer,
  SC_DeletedInfoContainer,
  SC_TopButtonsAlignmentContainer,
} from "./styles";
import { AddEditModalPopup } from "../AddEditModalPopup";
import TaskDisplayCard from "../TaskDisplayCard";
import isColorDark from "../../utils/isColorDark";
import { DeleteRestorePopupButton } from "../DeleteHandlerButtons";
import { UpdateContext, UpdateContextType } from "../../context/UpdateContext";

type Props = {
  taskId?: string;
};

const displayDate = (date: Date | null, isCompleted?: boolean) => {
  if (date === null) {
    return (
      <SC_DateContainer $isOverDue={false} $isNull={true}>
        <BsFillQuestionCircleFill style={STYLE_ICON_MARGINS} />
        <SC_BaseParagraph>No due date</SC_BaseParagraph>
      </SC_DateContainer>
    );
  }
  if (isCompleted) {
    return (
      <SC_DateContainer $isOverDue={false} $isNull={true}>
        <FaCheckCircle style={STYLE_ICON_MARGINS} />
        <SC_BaseParagraph>{`Done at: ${date.toLocaleString(undefined, {
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
  const [errorMessage, setErrorMessage] = useState(
    "Could not load data of this Task"
  );
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { updateCounter } = useContext(UpdateContext) as UpdateContextType;

  const isCompleted = taskData?.completedAt !== null;
  const isDeleted = taskData?.deletedAt !== null;

  const getTaskData = useCallback(async () => {
    setIsLoading(true);
    if (taskId === undefined)
      throw Error("!! Need to pass task ID to this component !!");
    try {
      const data = await getTaskDetailsAPI(taskId);
      if (isAPIStatusMessage(data)) {
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
  }, [getTaskData, updateCounter]);

  return (
    <SC_BackgroundContainer>
      <ViewHeader
        h1Text="Viewing Task"
        editButtonText="Edit Task"
        editWhat="TASK"
        hasBackButton
        currentData={taskData}
      />
      {isLoading ? (
        <SC_CentralNoDataContainer>
          <BarLoader
            height={BAR_LOADER_HEIGHT}
            width={BAR_LOADER_WIDTH}
            color={STYLE_TEXT_COLOR}
          />
        </SC_CentralNoDataContainer>
      ) : taskData === undefined ? (
        <SC_CentralNoDataContainer>
          <ErrorMessage errorMessage={errorMessage} isDismissable={false} />
        </SC_CentralNoDataContainer>
      ) : (
        <SC_LeftAlignedViewBackgroundContainer>
          {isDeleted ? (
            <SC_DeletedInfoContainer>
              <PiWarningCircleFill style={STYLE_ICON_MARGINS} />
              This task is deleted! Please restore this task or delete
              permanently.
            </SC_DeletedInfoContainer>
          ) : (
            <></>
          )}

          <SC_HeadContainer>
            <SC_TopTextContainer>
              <SC_Button $isCompleted={isCompleted}>
                {!isCompleted ? (
                  <FaCheckCircle />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
              </SC_Button>
              <SC_TaskNameHeading $isCompleted={isCompleted}>
                {taskData.name}
              </SC_TaskNameHeading>
            </SC_TopTextContainer>
            <SC_TopButtonsAlignmentContainer>
              {/* The line below is for showing restore button */}
              {isDeleted ? (
                <DeleteRestorePopupButton
                  id={taskData.sId}
                  what="TASK"
                  mode="RESTORE"
                />
              ) : (
                <></>
              )}
              <DeleteRestorePopupButton
                id={taskData.sId}
                what="TASK"
                mode={isDeleted ? "PERMA_DELETE" : "DELETE"}
              />
            </SC_TopButtonsAlignmentContainer>
          </SC_HeadContainer>

          <SC_DateAlignmentContainer>
            {isCompleted
              ? displayDate(taskData.completedAt, isCompleted)
              : displayDate(taskData.dueAt)}
          </SC_DateAlignmentContainer>

          <SC_DescriptionPara>
            <SC_DescriptionParaSpan>Description: </SC_DescriptionParaSpan>
            {taskData.description}
          </SC_DescriptionPara>

          <SC_TagsContainer>
            <SC_SubHeading>Tags:</SC_SubHeading>
            <SC_TagsListContainer>
              {taskData.tags.map((each) => (
                <SC_TagItemContainer
                  key={each.sId}
                  $color={each.colorHex}
                  $isColorDark={isColorDark(each.colorHex)}
                  onClick={() => {
                    navigate(TAG_PAGE_URL_NO_PARAM + each.sId);
                  }}
                >
                  <FaHashtag style={STYLE_ICON_MARGINS} />
                  {each.name}
                </SC_TagItemContainer>
              ))}
            </SC_TagsListContainer>
            {/* TODO: Add a proper popup for just adding a tag using reactjs-popup */}
            {/* <AddEditModalPopup mode="CREATE" text="Add a tag" /> */}
          </SC_TagsContainer>

          <SC_SubTaskContainer>
            <SC_SubTaskHeadingContainer>
              <SC_SubHeading>Sub Tasks</SC_SubHeading>
              <AddEditModalPopup
                mode="CREATE"
                text="Create a Sub task"
                what="SUBTASK"
                where={taskData}
              />
            </SC_SubTaskHeadingContainer>
            {taskData.subTasks.length !== 0 ? (
              <SC_SubTasksListContainer>
                {taskData.subTasks.map((each) => (
                  <SC_SubTaskListItemContainer key={each.sId}>
                    <TaskDisplayCard data={each} mode="TASK" />
                    <AddEditModalPopup
                      mode="EDIT"
                      text=""
                      what="SUBTASK"
                      where={taskData}
                      data={{
                        sId: each.sId,
                        name: each.name,
                        dueAt: each.dueAt,
                      }}
                    />
                    <DeleteRestorePopupButton
                      id={each.sId}
                      what="SUB_TASK"
                      mode="PERMA_DELETE"
                    />
                  </SC_SubTaskListItemContainer>
                ))}
              </SC_SubTasksListContainer>
            ) : (
              <SC_CentralNoDataContainer>
                <>
                  <SC_EmptyDisplayHeader>
                    Create a sub task to divide your task and be more
                    productive!
                  </SC_EmptyDisplayHeader>
                  <AddEditModalPopup
                    text="Create a Sub Task"
                    mode="CREATE"
                    what="SUBTASK"
                    where={taskData}
                  />
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
