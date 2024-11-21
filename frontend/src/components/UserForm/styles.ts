import styled from "styled-components";
import { STYLE_TEXT_COLOR, DEVICE_WIDTH } from "../../constants";

export const SC_BackgroundContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  overflow: auto;
`;

export const SC_FormCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  @media ${DEVICE_WIDTH.PC} {
    background-color: #2c2929;
    border-radius: 20px;
    padding: 35px;
    margin: 50px;
    box-shadow: 10px 15px 100px 20px rgba(0, 0, 0, 0.5);
    width: 500px
  }
  @media ${DEVICE_WIDTH.MOBILE} {
    margin: 50px 30px 50px 30px;
    width: 500px;
  }
`;

export const SC_LogoImg = styled.img`
  margin: 0 0 10px 0;
  align-self: center;
  @media ${DEVICE_WIDTH.PC} {
    width: 200px;
  }
  @media ${DEVICE_WIDTH.MOBILE} {
    width: 175px;
  }
`;

export const SC_FormInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SC_FormInputLabel = styled.label<{ $isError: boolean }>`
  color: ${(props) => (props.$isError ? "red" : STYLE_TEXT_COLOR)};
  font-size: 18px;
  font-weight: 500;
  margin-top: 8px;
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
  margin: 10px 0 10px 0;
`;

export const SC_FormSubmitButton = styled.button`
  background-color: #8c2d2d;
  border-style: none;
  border-radius: 10px;
  padding: 12px;
  color: ${STYLE_TEXT_COLOR};
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  @media ${DEVICE_WIDTH.PC} {
    margin-top: 16px;
  }
  @media ${DEVICE_WIDTH.MOBILE} {
    margin: 35px 0 20px 0;
  }
`;

export const SC_ErrorText = styled.p`
  margin: 0;
  color: red;
`;

export const SC_CTAContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media ${DEVICE_WIDTH.MOBILE} {
    justify-content: center;
  }
`;

export const SC_CTALabel = styled.label`
  color: ${STYLE_TEXT_COLOR};
  font-size: 16px;
  font-weight: 500;
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
`;

export const SC_CTAButton = styled.button`
  border-style: solid;
  border-radius: 8px;
  border-width: 2px;
  border-color: #d67373;
  background: linear-gradient(
    160deg,
    rgba(47, 17, 17, 1) 0%,
    rgba(140, 45, 45, 1) 100%
  );
  color: ${STYLE_TEXT_COLOR};
  font-weight: 500;
  font-size: 16px;
  padding: 6px 14px 6px 14px;
  cursor: pointer;
`;
