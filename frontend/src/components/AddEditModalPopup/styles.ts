import styled from "styled-components";
import {
  STYLE_CARD_BACKGROUND_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";
import { SC_TagItemContainer } from "../commonStyles";

const SC_CommonButton = styled.button`
  padding: 8px 16px 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  border: 3px solid transparent;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: border ${STYLE_TRANSITION_TIME};
`;

export const SC_AddTagButton = styled(SC_CommonButton)`
  &:hover {
    border: 3px solid #ab5f5f;
  }
  background-color: #5d3d3d;
  color: #ffd6d3;
`;

export const SC_OverlayBGContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn ${STYLE_TRANSITION_TIME};
`;

export const SC_PopupContentContainer = styled.div`
  background-color: ${STYLE_CARD_BACKGROUND_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
  text-align: center;
`;

export const SC_PopupHeader = styled.h1`
  padding: 0;
  margin: 0 0 5px 0;
  font-size: 30px;
`;

export const SC_PopupPara = styled.p`
  margin: 5px 0 5px 0;
  padding: 0;
`;

export const SC_PopupCloseButton = styled(SC_CommonButton)`
  &:hover {
    border: 3px solid #fe0000;
  }
  padding: 8px;
  font-size: 20px;
  background-color: #b20000;
  color: white;
  margin: 0 10px 0 0;
  height: 100%;
`;

export const SC_SaveButton = styled(SC_CommonButton)`
  &:hover {
    border: 3px solid #48d989;
  }
  background-color: #3cb371;
  color: #013220;
`;

export const SC_TopHeaderRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const SC_TopRowLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SC_TopModeHeader = styled.h1`
  margin: 0;
  font-size: 26px;
`;

export const SC_TopWhatHeader = styled.h1`
  margin: 0 5px 0 5px;
  background-color: #5d3d3d;
  font-size: 24px;
  padding: 5px 10px 5px 10px;
  border-radius: 7px;
  font-weight: normal;
`;

export const SC_ModalTagItemContainer = styled(SC_TagItemContainer)`
  font-size: 24px;
  margin: 0 5px 0 5px;
`;

export const SC_DetailsInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SC_NameInput = styled.input<{ $isError: boolean }>`
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => (props.$isError ? "red" : "#d67373")};
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #111111;
  color: #ecc4c4;
  margin-top: 20px;
  font-family: "Noto Sans", sans-serif;
`;

export const SC_DescriptionInput = styled.textarea<{ $isError: boolean }>`
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => (props.$isError ? "red" : "#d67373")};
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #111111;
  color: #ecc4c4;
  margin-top: 10px;
  font-family: "Noto Sans", sans-serif;
  resize: vertical;
  height: auto;
`;

export const SC_DateDisplayPickerButton = styled.button<{ $isError: boolean }>`
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => (props.$isError ? "red" : "#d67373")};
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #111111;
  color: #ecc4c4;
  margin-top: 20px;
  font-family: "Noto Sans", sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SC_DatePickerContainer = styled.div`
  align-self: flex-start;
`;