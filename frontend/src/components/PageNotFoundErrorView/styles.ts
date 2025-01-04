import styled from "styled-components";
import {
  STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";

export const SC_BackgroundContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 20%;
  padding-right: 20%;
`;

export const SC_PageErrorImage = styled.h1`
  font-size: 228px;
  margin: 0;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
`;

export const SC_ServerErrorImage = styled.img`
  width: 400px;
  margin-right: 10px;
  height: auto;
`;

export const SC_SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  text-align: left;
`;

export const SC_SideText = styled.p`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  text-align: left;
`;

export const SC_PageRedirectButton = styled.button`
  &:hover {
    border: 3px solid ${STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR};
  }
  cursor: pointer;
  background-color: #8c2d2d;
  border: 3px solid transparent;
  border-radius: 10px;
  padding: 12px;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border ${STYLE_TRANSITION_TIME};
  margin-bottom: 18px;
`;
