import styled from "styled-components";
import { STYLE_TRANSITION_TIME } from "../../constants";

export const SC_Button = styled.button`
  &:hover {
    border: 3px solid #48d989;
  }
  padding: 8px 16px 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  border: 3px solid transparent;
  background-color: #3cb371;
  color: #013220;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: border ${STYLE_TRANSITION_TIME};
`;

export const SC_DeleteButton = styled(SC_Button)`
  &:hover {
    background-color: #b20000;
    border: 3px solid #fe0000;
  }
  color: white;
  background-color: #b20000;
`;
