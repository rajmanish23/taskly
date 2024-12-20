import styled from "styled-components";
import {
  STYLE_BORDER_COLOR,
  STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR,
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";

export const SC_TaskListItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  width: clamp(530px, 100%, 1000px);
  margin-bottom: 15px;
`;

export const SC_TaskCompleteButton = styled.button<{ $isCompleted: boolean }>`
  &:hover {
    background-color: ${(props) =>
      props.$isCompleted ? "#cec3c3" : "#48d989"};
  }
  border-radius: 30px 0 0 30px;
  border-style: none;
  padding: 0 15px 0 15px;
  font-size: 26px;
  background-color: ${(props) => (props.$isCompleted ? "#827b7b" : "#3cb371")};
  transition: background-color ${STYLE_TRANSITION_TIME};
  color: ${(props) => (props.$isCompleted ? "black" : "#013220")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SC_DataContainer = styled.div<{$isClickable: boolean}>`
  &:hover {
    background-color: #363333;
  }
  background-color: ${STYLE_CARD_BACKGROUND_COLOR};
  transition: background-color ${STYLE_TRANSITION_TIME};
  border-radius: 0 30px 30px 0;
  padding: 20px;
  width: 100%;
  font-size: 18px;
  cursor: ${({$isClickable}) => $isClickable ? "pointer" : "default"};
`;

export const SC_TaskItemHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const SC_BaseParagraph = styled.p`
  margin: 0;
  padding: 0;
`;

export const SC_TaskNameHeading = styled(SC_BaseParagraph)<{$isCompleted: boolean}>`
  width: 60%;
  font-size: 24px;
  font-weight: ${(props) => props.$isCompleted ? "normal" : "600"};
  color: ${(props) => props.$isCompleted ? "grey" : "inherit"};
  text-decoration: ${(props) => props.$isCompleted ? "line-through" : "none"};
`;

export const SC_TagListContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 5px 0 0 0;
  padding: 0 5px 0 5px;
  border-top: 1px solid ${STYLE_BORDER_COLOR};
`;

export const SC_DescriptionPara = styled(SC_BaseParagraph)`
  border-top: 1px solid ${STYLE_BORDER_COLOR};
  margin: 5px 0 0 0;
  padding: 10px 5px 5px 5px;
`;

export const SC_DescriptionSpanHeader = styled.span`
  font-weight: 700;
`;

export const SC_SubTaskListContainer = styled.ul`
  margin: 5px 0 0 0;
  padding: 5px 0 0 20px;
  border-top: 1px solid ${STYLE_BORDER_COLOR};
`;

export const SC_MoreSubTasksInfo = styled(SC_BaseParagraph)`
  margin: 5px 0 5px 0;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  color: #918787;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SC_MoreSubTasksNumber = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #f6dddd;
  margin-right: 5px;
  padding: 4px 8px 4px 8px;
  border-radius: 10px;
  background-color: ${STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR};
`;