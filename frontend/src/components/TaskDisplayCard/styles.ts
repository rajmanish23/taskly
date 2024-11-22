import styled from "styled-components";
import {
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";

export const SC_TaskListItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  width: clamp(530px, 80%, 800px);
  margin-bottom: 15px;
`;

export const SC_TaskCompleteButton = styled.button`
  &:hover {
    background-color: #48d989;
  }
  border-radius: 30px 0 0 30px;
  border-style: none;
  padding: 12px;
  font-size: 26px;
  background-color: #3cb371;
  transition: background-color ${STYLE_TRANSITION_TIME};
  color: #013220;
`;

export const SC_DataContainer = styled.div`
  &:hover {
    background-color: #363333;
  }
  background-color: ${STYLE_CARD_BACKGROUND_COLOR};
  transition: background-color ${STYLE_TRANSITION_TIME};
  border-radius: 0 30px 30px 0;
  /* TODO: Still in work */
  padding: 10px;
  width: 100%;
`;

export const SC_TaskItemHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SC_BaseParagraph = styled.p`
  margin: 0;
  padding: 0;
`