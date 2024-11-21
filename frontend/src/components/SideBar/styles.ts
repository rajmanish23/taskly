import styled from "styled-components";

export const SC_SidebarContainer = styled.div`
  height: 100%;
  width: 250px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2c2929;
  color: white;
  border-right: 1px solid red;
`;

export const SC_ContentContainer = styled.div` 
  display: flex;
  flex-direction: column;
`;

export const SC_LogoImage = styled.img`
  width: 150px;
  align-self: center;
  /* background-color: #fff; */
  padding: 10px 50px 10px 50px;
  border-bottom: 1px solid red;
`;

export const SC_OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px 0 15px;
`;

export const SC_OptionsHeader = styled.p`
  margin: 0 0 10px 0;
  padding-bottom: 7px;
  border-bottom: 1px solid red;
  font-size: 20px;
`;

export const SC_Button = styled.button<{$isActive: boolean}>`
  padding: 8px 16px 8px 16px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: start;
  border-radius: 10px;
  border-style: none;
  background-color: ${(props) => props.$isActive ? "#fff" : "transparent"};
  color: white;
`;

export const SC_AddTagButton = styled.button`
  padding: 8px 16px 8px 16px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: start;
  border-radius: 10px;
  border: 2px solid red;
  background-color: #2c1212;
  color: white;
`;

export const SC_ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: #fff; */
  padding: 10px 20px 10px 20px;
  border-top: 1px solid red;
`;

export const SC_ProfileImage = styled.img`
  width: 42px;
  border-radius: 100px;
  margin-right: 15px;
`;
