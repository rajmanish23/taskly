import styled from "styled-components";
import {
  STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR,
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";
import Popup from "reactjs-popup";

export const SC_Button = styled.button`
  padding: 8px 16px 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  border: 3px solid transparent;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: border ${STYLE_TRANSITION_TIME};
  margin-left: 10px;
`;

export const SC_DeleteButton = styled(SC_Button)`
  &:hover {
    background-color: #b20000;
    border: 3px solid #fe0000;
  }
  color: white;
  background-color: #b20000;
`;

export const SC_RestoreButton = styled(SC_Button)`
  &:hover {
    background-color: #3cb371;
    border: 3px solid #48d989;
  }
  color: #013220;
  background-color: #3cb371;
`;

export const SC_Popup = styled(Popup)`
  &-content {
    background-color: ${STYLE_CARD_BACKGROUND_COLOR};
    padding: 15px;
    border-radius: 15px;
    border-style: solid;
    border-color: ${STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR};
    border-width: 2px;
  }
  &-arrow {
    color: ${STYLE_CARD_BACKGROUND_COLOR};
    stroke-width: 2px;
    stroke: ${STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR};
    stroke-dasharray: 30px;
    stroke-dashoffset: -54px;
  }
`;

export const SC_PopupFormText = styled.p``;

export const SC_PopupButtonContainer = styled.div``;

export const SC_PopupActionButton = styled.button``;