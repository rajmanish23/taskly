import styled from "styled-components";

export const SC_SidebarContainer = styled.div`
  height: 100%;
  width: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2c2929;
  color: white;
  padding: 20px;
  border-right: 2px solid red;
`;

export const SC_ContentContainer = styled.div` 
  display: flex;
  flex-direction: column;
`;

export const SC_LogoImage = styled.img`
  width: 200px;
  align-self: center;
`;

export const SC_ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SC_ProfileImage = styled.img`
  width: 60px;
  border-radius: 100px;
`;
