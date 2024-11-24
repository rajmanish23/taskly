import styled from "styled-components";
import { STYLE_TRANSITION_TIME } from "../../constants";

export const SC_DeleteViewPara = styled.p`
  width: 580px;
  margin: 0 0 20px 0;
`;

export const SC_DeleteButton = styled.button`
  &:hover {
    border: 3px solid #fe0000;
  }
  padding: 8px 16px 8px 16px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 3px solid transparent;
  background-color: #b20000;
  color: white;
  transition: border ${STYLE_TRANSITION_TIME};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 300px;
`;
