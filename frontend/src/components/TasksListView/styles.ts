import styled from "styled-components";
import { STYLE_BORDER_COLOR } from "../../constants";

export const SC_BackgroundListContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px 0 50px;
`;

export const SC_HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 3px solid ${STYLE_BORDER_COLOR};
  padding: 0 10px 15px 10px;
`;

export const SC_HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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

export const SC_CentralNoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SC_EmptyDisplayHeader = styled.h1`
  font-family: "Caveat", cursive;
  font-size: 40px;
  font-weight: normal;
`;
