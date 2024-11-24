import styled from "styled-components";
import { STYLE_TRANSITION_TIME } from "../../constants";

export const SC_DeleteViewPara = styled.p`
  width: 580px;
  margin: 0 0 20px 0;
`;

export const SC_DeleteButton = styled.button<{ $isDisabled: boolean }>`
  &:hover {
    border: 3px solid ${(props) => (props.$isDisabled ? "#cbcbce" : "#fe0000")};
  }
  padding: 8px 16px 8px 16px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 3px solid transparent;
  background-color: ${(props) => (props.$isDisabled ? "#808082" : "#b20000")};
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

export const SC_DeleteTextChallenge = styled.input`
  width: 500px;
  border-style: solid;
  border-width: 2px;
  border-color: #d67373;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #111111;
  color: #ecc4c4;
  margin: 0px 0 20px 0;
`;
