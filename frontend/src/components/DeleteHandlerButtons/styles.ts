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

export const SC_TagRemoveButton = styled.button`
  font-size: 20px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  color: inherit;
  transition: background-color ${STYLE_TRANSITION_TIME},
    color ${STYLE_TRANSITION_TIME};
  &:hover {
    background-color: #b20000;
    color: white;
  }
`;

export const SC_Popup = styled(Popup)`
  @keyframes anvil {
    0% {
      transform: scale(1) translateY(-10px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    1% {
      transform: scale(0.96) translateY(-10px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
      box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    }
  }
  &-content {
    background-color: ${STYLE_CARD_BACKGROUND_COLOR};
    padding: 15px;
    border-radius: 15px;
    border-style: solid;
    border-color: ${STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR};
    border-width: 2px;
    animation: anvil ${STYLE_TRANSITION_TIME} cubic-bezier(0.38, 0.1, 0.36, 0.9)
      forwards;
  }
  &-arrow {
    color: ${STYLE_CARD_BACKGROUND_COLOR};
    stroke-width: 2px;
    stroke: ${STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR};
    stroke-dasharray: 30px;
    stroke-dashoffset: -54px;
  }
`;

export const SC_PopupFormText = styled.p`
  font-size: 18px;
  margin: 0;
  padding: 0;
`;

export const SC_PopupButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

export const SC_PopupActionButton = styled(SC_Button)`
  &:hover {
    background-color: #827b7b;
    border: 3px solid #cec3c3;
  }
  color: black;
  background-color: #827b7b;
  margin-right: 10px;
`;
