import styled from "styled-components";
import {
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";

export const SC_AddTagButton = styled.button`
  &:hover {
    border: 3px solid #ab5f5f;
  }
  padding: 8px 16px 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  border: 3px solid transparent;
  background-color: #5d3d3d;
  color: #ffd6d3;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: border ${STYLE_TRANSITION_TIME};
`;

export const SC_OverlayBGContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn ${STYLE_TRANSITION_TIME};
`;

export const SC_PopupContentContainer = styled.div`
  background-color: ${STYLE_CARD_BACKGROUND_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
  text-align: center;
`;

export const SC_PopupHeader = styled.h1`
  padding: 0;
  margin: 0 0 5px 0;
  font-size: 30px;
`;

export const SC_PopupPara = styled.p`
  margin: 5px 0 5px 0;
  padding: 0;
`;

export const SC_PopupCloseButton = styled.button`
  margin: 10px 0 0 0;
`;
