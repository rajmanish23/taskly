import styled from "styled-components";
import { STYLE_TEXT_COLOR } from "../../constants";

export const SC_FormInputLabel = styled.label<{ $isError: boolean }>`
  color: ${(props) => (props.$isError ? "red" : STYLE_TEXT_COLOR)};
  font-size: 18px;
  font-weight: 500;
  margin: 15px 15px 0 0;
`;

export const SC_FormInput = styled.input<{ $isError: boolean }>`
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => (props.$isError ? "red" : "#d67373")};
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #111111;
  color: #ecc4c4;
  margin-top: 10px;
`;

export const SC_ErrorText = styled.p`
  margin: 5px 0 0 0;
  color: red;
`;

export const SC_InputErrorContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
