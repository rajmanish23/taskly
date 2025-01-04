import styled from "styled-components";
import {
  STYLE_BUTTON_HIGHLIGHT_COLOR,
  STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR,
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";

export const SC_PositioningContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const SC_ViewModeSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: rgb(0, 0, 0) 0px 0px 20px;
  background-color: ${STYLE_CARD_BACKGROUND_COLOR};
  border-radius: 10px;
  padding: 10px;
  z-index: 1;
  position: absolute;
  bottom: 0;
`;

export const SC_ViewModeSelector = styled.button<{ $selected: boolean }>`
  padding: 8px 16px;
  margin: 0 5px 0 5px;
  font-size: 16px;
  background-color: ${({ $selected }) =>
    $selected ? STYLE_BUTTON_HIGHLIGHT_COLOR : "transparent"};
  color: white;
  border-radius: 5px;
  border: 3px solid transparent;
  cursor: pointer;
  transition: background-color ${STYLE_TRANSITION_TIME},
    border ${STYLE_TRANSITION_TIME};
  &:hover {
    background-color: ${({ $selected }) =>
      $selected
        ? STYLE_BUTTON_HIGHLIGHT_COLOR
        : STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR};
    border: 3px solid
      ${(props) => (props.$selected ? "#ab5f5f" : "transparent")};
  }
`;
