import styled from "styled-components";
import { DEVICE_WIDTH, STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR, STYLE_TEXT_COLOR, STYLE_TRANSITION_TIME } from "../constants";

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