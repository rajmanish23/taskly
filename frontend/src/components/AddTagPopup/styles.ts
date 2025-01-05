import styled from "styled-components";
import Popup from "reactjs-popup";

import {
  STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR,
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";

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


export const SC_TagAddButton = styled.button`
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