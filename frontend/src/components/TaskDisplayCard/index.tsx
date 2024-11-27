import { FaCheckCircle, FaHashtag } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import {
  SC_TaskCompleteButton,
  SC_TaskListItemContainer,
  SC_DataContainer,
  SC_TaskItemHeaderContainer,
  SC_BaseParagraph,
  SC_TagListContainer,
  SC_TagItemContainer,
  SC_DescriptionPara,
  SC_DescriptionSpanHeader,
  SC_SubTaskListContainer,
  SC_TaskNameHeading,
  SC_MoreSubTasksInfo,
  SC_MoreSubTasksNumber,
} from "./styles";
import { isTask } from "../../utils/objectTypeCheckers";
import { STYLE_ICON_MARGINS, TASK_PAGE_URL_NO_PARAM } from "../../constants";
import { SC_DateContainer } from "../commonStyles";

type TaskDisplayCardProps = {
  data: Task | SubTask;
  mode: SelectedView;
};

const displayDate = (date: Date | null, view: SelectedView) => {
  if (date === null) {
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
      <SC_BaseParagraph>{`${isOverDue ? "Overdue" : "Due"}: ${
        view === "TODAY" ? date.toLocaleTimeString() : date.toLocaleString()
      }`}</SC_BaseParagraph>
    </SC_DateContainer>
  );
};

const TaskDisplayCard = ({ data, mode }: TaskDisplayCardProps) => {
  const navigate = useNavigate();

  if (isTask(data)) {
    return (
      <SC_TaskListItemContainer>
        <SC_TaskCompleteButton>
          <FaCheckCircle />
        </SC_TaskCompleteButton>
        <SC_DataContainer
          onClick={() => navigate(TASK_PAGE_URL_NO_PARAM + data.sId)}
        >
          <SC_TaskItemHeaderContainer>
            <SC_TaskNameHeading>{data.name}</SC_TaskNameHeading>
            {displayDate(data.dueAt, mode)}
          </SC_TaskItemHeaderContainer>

          {data.tags.length !== 0 ? (
            <SC_TagListContainer>
              {data.tags.map((each) => (
                <SC_TagItemContainer key={each.sId} $color={each.colorHex}>
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
        <SC_TaskCompleteButton>
          <FaCheckCircle />
        </SC_TaskCompleteButton>
        <SC_DataContainer
          onClick={() => navigate(TASK_PAGE_URL_NO_PARAM + data.sId)}
        >
          <SC_TaskItemHeaderContainer>
            <SC_TaskNameHeading>{data.name}</SC_TaskNameHeading>
            {displayDate(data.dueAt, mode)}
          </SC_TaskItemHeaderContainer>
        </SC_DataContainer>
      </SC_TaskListItemContainer>
    );
  }
};

export default TaskDisplayCard;
