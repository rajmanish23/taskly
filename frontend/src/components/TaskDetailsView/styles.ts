import styled from "styled-components";
import { STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR } from "../../constants";

export const SC_DateContainer = styled.div<{
  $isOverDue: boolean;
  $isNull: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.$isOverDue
      ? "#a04747"
      : props.$isNull
      ? STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR
      : "#d8a25e"};
  color: ${(props) =>
    props.$isOverDue ? "white" : props.$isNull ? "white" : "black"};
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
`;

export const SC_BaseParagraph = styled.p`
  margin: 0;
  padding: 0;
`;
