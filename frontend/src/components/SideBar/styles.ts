import styled from "styled-components";
import {
  STYLE_BORDER_COLOR,
  STYLE_BUTTON_HIGHLIGHT_COLOR,
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR,
  STYLE_TEXT_COLOR,
  STYLE_TRANSITION_TIME,
  STYLE_NON_BUTTON_HOVER_HIGHLIGHT_COLOR,
  STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR,
} from "../../constants";

export const SC_SidebarContainer = styled.div`
  height: 100%;
  width: 220px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${STYLE_CARD_BACKGROUND_COLOR};
  color: white;
  border-right: 1px solid ${STYLE_BORDER_COLOR};
`;

export const SC_ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SC_LogoImage = styled.img`
  &:hover {
    background-color: ${STYLE_NON_BUTTON_HOVER_HIGHLIGHT_COLOR};
  }
  width: 150px;
  align-self: center;
  padding: 10px 35px 10px 35px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${STYLE_BORDER_COLOR};
  border-right: 1px solid ${STYLE_BORDER_COLOR};
  transition: background-color ${STYLE_TRANSITION_TIME};
  cursor: pointer;
`;

export const SC_InfoContainer = styled.div`
  background-color: ${STYLE_BUTTON_HIGHLIGHT_COLOR};
  cursor: default;
  padding: 8px 16px 8px 16px;
  font-size: 16px;
  margin: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffd3d3;
`;

export const SC_OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0 15px;
`;

export const SC_OptionsHeader = styled.p`
  margin: 0 0 10px 0;
  padding: 0 5px 8px 5px;
  border-bottom: 2px solid ${STYLE_TEXT_COLOR};
  font-size: 20px;
`;

export const SC_Button = styled.button<{ $isActive: boolean; $color?: string }>`
  &:hover {
    background-color: ${(props) =>
      !props.$isActive
        ? STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR
        : props.$color !== undefined
        ? props.$color
        : STYLE_BUTTON_HIGHLIGHT_COLOR};
    border: 3px solid
      ${(props) => (props.$isActive ? "#ab5f5f" : "transparent")};
  }
  padding: 8px 16px 8px 16px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: start;
  border-radius: 10px;
  border: 3px solid transparent;
  background-color: ${(props) =>
    !props.$isActive
      ? "transparent"
      : props.$color !== undefined
      ? props.$color
      : STYLE_BUTTON_HIGHLIGHT_COLOR};
  color: white;
  transition: background-color ${STYLE_TRANSITION_TIME},
    border ${STYLE_TRANSITION_TIME};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const SC_DeleteButton = styled(SC_Button)`
  &:hover {
    background-color: ${(props) =>
      props.$isActive ? "#b20000" : STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR};
    border: 3px solid
      ${(props) => (props.$isActive ? "#fe0000" : "transparent")};
  }
  color: ${(props) => (props.$isActive ? "white" : "red")};
  background-color: ${(props) => (props.$isActive ? "#b20000" : "transparent")};
`;

export const SC_BackButton = styled(SC_Button)`
  margin: 15px 15px 0 15px;
`;

export const SC_ProfileContainer = styled.div<{ $isActive: boolean }>`
  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR
        : STYLE_NON_BUTTON_HOVER_HIGHLIGHT_COLOR};
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 20px;
  border-top: 1px solid ${STYLE_BORDER_COLOR};
  background-color: ${(props) =>
    props.$isActive ? STYLE_BUTTON_HIGHLIGHT_COLOR : "transparent"};
  transition: background-color ${STYLE_TRANSITION_TIME};
  cursor: pointer;
`;

export const SC_ProfileImage = styled.img`
  width: 42px;
  border-radius: 100px;
  margin-right: 15px;
`;
