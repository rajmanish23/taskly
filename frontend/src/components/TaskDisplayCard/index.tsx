import { FaCheckCircle, FaHashtag } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  SC_TaskCompleteButton,
  SC_TaskListItemContainer,
  SC_DataContainer,
  SC_TaskItemHeaderContainer,
  SC_BaseParagraph,
  SC_TagListContainer,
  SC_DescriptionPara,
  SC_DescriptionSpanHeader,
  SC_SubTaskListContainer,
  SC_TaskNameHeading,
  SC_MoreSubTasksInfo,
  SC_MoreSubTasksNumber,
} from "./styles";
import { isTask } from "../../utils/objectTypeCheckers";
import { STYLE_ICON_MARGINS, TASK_PAGE_URL_NO_PARAM } from "../../constants";
import { SC_DateContainer, SC_TagItemContainer } from "../commonStyles";
import isColorDark from "../../utils/isColorDark";
import useToggleComplete from "../../hooks/useToggleComplete";

type TaskDisplayCardProps = {
  data: Task | SubTask;
  mode: SelectedView;
};

const displayDate = (
  date: Date | null,
  view: SelectedView,
  isCompleted?: boolean
) => {
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
        <SC_BaseParagraph>{`Done at: ${
          view === "TODAY" ? date.toLocaleTimeString() : date.toLocaleString()
        }`}</SC_BaseParagraph>
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
      <SC_BaseParagraph>{`${isOverDue ? "Overdue" : "Due"}: ${
        view === "TODAY" ? date.toLocaleTimeString() : date.toLocaleString()
      }`}</SC_BaseParagraph>
    </SC_DateContainer>
  );
};

const TaskDisplayCard = ({ data, mode }: TaskDisplayCardProps) => {
  const toggleComplete = useToggleComplete();
  const navigate = useNavigate();
  const isCompleted = data.completedAt !== null;

  if (isTask(data)) {
    return (
      <SC_TaskListItemContainer>
        {/* TODO: Add completeRestore function which accepts isCompleted 
        and marks as completed if isComplete is false, 
        otherwise unmarks it as completed. */}
        <SC_TaskCompleteButton
          $isCompleted={isCompleted}
          onClick={() => toggleComplete(data.sId, isCompleted, "TASK")}
        >
          {!isCompleted ? <FaCheckCircle /> : <MdOutlineRadioButtonUnchecked />}
        </SC_TaskCompleteButton>
        <SC_DataContainer
          onClick={() => navigate(TASK_PAGE_URL_NO_PARAM + data.sId)}
          $isClickable={true}
        >
          <SC_TaskItemHeaderContainer>
            <SC_TaskNameHeading $isCompleted={isCompleted}>
              {data.name}
            </SC_TaskNameHeading>
            {isCompleted
              ? displayDate(data.completedAt, mode, isCompleted)
              : displayDate(data.dueAt, mode)}
          </SC_TaskItemHeaderContainer>

          {data.tags.length !== 0 ? (
            <SC_TagListContainer>
              {data.tags.map((each) => (
                <SC_TagItemContainer
                  key={each.sId}
                  $color={each.colorHex}
                  $isColorDark={isColorDark(each.colorHex)}
                >
                  <FaHashtag style={STYLE_ICON_MARGINS} />
                  {each.name}
                </SC_TagItemContainer>
              ))}
            </SC_TagListContainer>
          ) : (
            <></>
          )}

          {data.description !== "" ? (
            <SC_DescriptionPara>
              <SC_DescriptionSpanHeader>Description: </SC_DescriptionSpanHeader>
              {data.description}
            </SC_DescriptionPara>
          ) : (
            <></>
          )}

          {data.subTasks.length !== 0 ? (
            <SC_SubTaskListContainer>
              {data.subTasks.map((each, index) => {
                if (index >= 3) return;
                return (
                  <SC_TaskItemHeaderContainer key={each.sId}>
                    <SC_BaseParagraph>{each.name}</SC_BaseParagraph>
                    {displayDate(each.dueAt, mode)}
                  </SC_TaskItemHeaderContainer>
                );
              })}
              {data.subTasks.length > 3 ? (
                <SC_MoreSubTasksInfo>
                  <SC_MoreSubTasksNumber>
                    {data.subTasks.length - 3}+
                  </SC_MoreSubTasksNumber>{" "}
                  Sub Tasks
                </SC_MoreSubTasksInfo>
              ) : (
                <></>
              )}
            </SC_SubTaskListContainer>
          ) : (
            <></>
          )}
        </SC_DataContainer>
      </SC_TaskListItemContainer>
    );
  } else {
    return (
      <SC_TaskListItemContainer>
        <SC_TaskCompleteButton
          $isCompleted={isCompleted}
          onClick={() => toggleComplete(data.sId, isCompleted, "SUB_TASK")}
        >
          {!isCompleted ? <FaCheckCircle /> : <MdOutlineRadioButtonUnchecked />}
        </SC_TaskCompleteButton>
        <SC_DataContainer $isClickable={false}>
          <SC_TaskItemHeaderContainer>
            <SC_TaskNameHeading $isCompleted={isCompleted}>
              {data.name}
            </SC_TaskNameHeading>
            {isCompleted
              ? displayDate(data.completedAt, mode, isCompleted)
              : displayDate(data.dueAt, mode)}
          </SC_TaskItemHeaderContainer>
        </SC_DataContainer>
      </SC_TaskListItemContainer>
    );
  }
};

export default TaskDisplayCard;
