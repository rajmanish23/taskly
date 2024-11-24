import styled from "styled-components";

export const SC_BackgroundListContainer = styled.div`
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

export const SC_EmptyDisplayHeader = styled.h1`
  font-family: "Caveat", cursive;
  font-size: 40px;
  font-weight: normal;
`;

export const SC_TaskListContainer = styled.ul`
  overflow: auto;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0 0;
`;
