import styled from "styled-components";

export const SC_TagItemContainer = styled.li<{
  $color: string;
  $isColorDark: boolean;
  $isClickable: boolean;
  $isBigDisplay: boolean;
}>`
  background-color: ${(props) => props.$color};
  padding: 5px 10px 5px 10px;
  border-radius: 7px;
  margin: ${({ $isBigDisplay }) =>
    $isBigDisplay ? "0 5px 0 5px" : "10px 10px 5px 0"};
  font-size: ${({ $isBigDisplay }) => ($isBigDisplay ? "24px" : "16px")};
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => (props.$isColorDark ? "white" : "black")};
  height: ${({ $isBigDisplay }) => ($isBigDisplay ? "32px" : "24px")};
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "inherit")};
`;
