import styled from "styled-components";
import { DEVICE_WIDTH, STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR, STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR, STYLE_TEXT_COLOR, STYLE_TRANSITION_TIME } from "../constants";

export const SC_BackgroundContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px 0 50px;
`;

export const SC_CentralNoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SC_LeftAlignedViewBackgroundContainer = styled.div`
  padding: 20px 0 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const SC_FlexRowStartContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const SC_FormSubmitButton = styled.button`
  @media ${DEVICE_WIDTH.PC} {
    margin-top: 25px;
  }
  @media ${DEVICE_WIDTH.MOBILE} {
    margin: 30px 0 20px 0;
  }
  &:hover {
    border: 3px solid ${STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR};
  }
  cursor: pointer;
  background-color: #8c2d2d;
  border:3px solid transparent;
  border-radius: 10px;
  padding: 12px;
  color: ${STYLE_TEXT_COLOR};
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border ${STYLE_TRANSITION_TIME};
`;

export const SC_SettingsViewPara = styled.p`
  width: 580px;
  margin: 0 0 20px 0;
`;

export const SC_EmptyDisplayHeader = styled.h1`
  font-family: "Caveat", cursive;
  font-size: 40px;
  font-weight: normal;
`;

export const SC_DateContainer = styled.div<{
  $isOverDue: boolean;
  $isNull: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.$isOverDue
      ? "#a04747"
      : props.$isNull
      ? STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR
      : "#d8a25e"};
  color: ${(props) =>
    props.$isOverDue ? "white" : props.$isNull ? "white" : "black"};
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
`;