import styled from "styled-components";
import { DEVICE_WIDTH, STYLE_TEXT_COLOR } from "../constants";

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

export const SC_SettingsViewBackgroundContainer = styled.div`
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
  background-color: #8c2d2d;
  border-style: none;
  border-radius: 10px;
  padding: 12px;
  color: ${STYLE_TEXT_COLOR};
  font-weight: 700;
  font-size: 16px;
  height: 45px;
  cursor: pointer;
  @media ${DEVICE_WIDTH.PC} {
    margin-top: 25px;
  }
  @media ${DEVICE_WIDTH.MOBILE} {
    margin: 30px 0 20px 0;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;