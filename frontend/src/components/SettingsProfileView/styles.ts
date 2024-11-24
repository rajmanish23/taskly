import styled from "styled-components";
import { STYLE_BUTTON_HIGHLIGHT_COLOR } from "../../constants";

export const SC_ProfileImage = styled.img`
  width: 120px;
  border-radius: 10px;
  margin-right: 20px;
`;

export const SC_ProfileName = styled.h1`
  font-family: "Caveat", cursive;
  font-size: 50px;
  margin: 0;
  padding: 0;
`;

export const SC_ProfileEmailLabel = styled.p`
  font-size: 20px;
  margin: 10px 10px 0 0;
`;

export const SC_ProfileEmailTextContainer = styled.p`
  font-size: 18px;
  background-color: ${STYLE_BUTTON_HIGHLIGHT_COLOR};
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0 0 0;
`;