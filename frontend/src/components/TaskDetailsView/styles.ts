import styled from "styled-components";
import {
  STYLE_BORDER_COLOR,
  STYLE_TRANSITION_TIME,
} from "../../constants";


export const SC_BaseParagraph = styled.p`
  margin: 0;
  padding: 0;
`;

export const SC_HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
`;

export const SC_TopTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SC_TaskNameHeading = styled.h1`
  margin: 0 0 0 20px;
  font-weight: normal;
`;

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

export const SC_DateAlignmentContainer = styled.div`
  padding-left: 10px;
  box-sizing: border-box;
`;

export const SC_DescriptionPara = styled.p`
  border-top: 1px solid ${STYLE_BORDER_COLOR};
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin: 20px 0 0 0;
  font-size: 18px;
  color: #d8d8d8;
`;

export const SC_DescriptionParaSpan = styled.span`
  font-weight: 600;
  color: white;
`;

export const SC_TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid ${STYLE_BORDER_COLOR};
  width: 100%;
  padding: 15px 10px 15px 10px;
  box-sizing: border-box;
  button {
    margin: 0 0 0 20px;
  }
`;

export const SC_SubHeading = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 24px;
`;

export const SC_TagsListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  li {
    padding: 10px;
    margin: 0 0 0 10px;
    border-radius: 10px;
  }
`;

export const SC_SubTaskContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid ${STYLE_BORDER_COLOR};
  padding: 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const SC_SubTaskHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const SC_SubTasksListContainer = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  margin: 0;
`;