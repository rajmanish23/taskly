import styled from "styled-components";
import { STYLE_TRANSITION_TIME } from "../../constants";

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
