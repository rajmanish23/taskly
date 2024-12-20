import styled from "styled-components";
import { STYLE_BORDER_COLOR, STYLE_TRANSITION_TIME } from "../../constants";

export const SC_HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 3px solid ${STYLE_BORDER_COLOR};
  padding: 0 10px 15px 10px;
`;

export const SC_BackButton = styled.button`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  &:hover {
    border: 3px solid #ab5f5f;
  }
  padding: 0 10px 0 10px;
  border-radius: 10px;
  border: 3px solid transparent;
  background-color: #5d3d3d;
  color: #ffd6d3;
  cursor: pointer;
  transition: border ${STYLE_TRANSITION_TIME};
  margin-right: 15px;
`;

export const SC_HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
`;

export const SC_TopHeader1 = styled.h1`
  margin: 0 10px 0 0;
  padding: 0;
  font-weight: 500;
`;

export const SC_TopHeader2 = styled.h2`
  margin: 0 10px 3px 0;
  padding: 0;
  font-family: "Caveat", cursive;
  font-weight: normal;
`;

export const SC_ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;