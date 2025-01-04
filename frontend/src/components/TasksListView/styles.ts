import styled from "styled-components";

export const SC_TaskListContainer = styled.ul`
  overflow: auto;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0 0;
`;

export const SC_TaskCardContainer = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  & > button {
    margin-bottom: 10px;
    margin-left: 10px;
    border-radius: 30px;
    font-size: 26px;
  }
`;