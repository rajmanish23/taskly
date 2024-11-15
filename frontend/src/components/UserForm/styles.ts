import styled from "styled-components";
import { STYLE_TEXT_COLOR } from "../../constants";

export const BackgroundContainer = styled.div`
  background: linear-gradient(
    160deg,
    rgba(23, 23, 23, 1) 70%,
    rgba(65, 3, 3, 1) 100%
  );
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  overflow: auto;
`;

export const FormCardContainer = styled.div`
  background-color: #2c2929;
  border-radius: 20px;
  padding: 35px;
  margin: 50px;
  box-shadow: 10px 15px 100px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Roboto";
  box-sizing: border-box;
`;

export const LogoImg = styled.img`
  margin: 20px 0 20px 0;
  width: 80%;
  align-self: center;
`;

export const FormInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FormInputLabel = styled.label`
  color: ${STYLE_TEXT_COLOR};
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
`;

export const FormInput = styled.input<{ $isError: boolean }>`
  border-style: solid;
  border-width: 2px;
  border-color: ${props => props.$isError ? "red" : "#d67373"};
  border-radius: 15px;
  padding: 12px;
  font-size: 18px;
  background-color: #111111;
  color: #ecc4c4;
  margin: 10px 0 10px 0;
`;

export const FormSubmitButton = styled.button`
  margin-top: 25px;
  background-color: #8c2d2d;
  border-style: none;
  border-radius: 15px;
  padding: 18px;
  color: ${STYLE_TEXT_COLOR};
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: red;
`;

export const CTAContainer = styled.div`
  display: "flex";
  flex-direction: "row";
  align-items: center;
`;

export const CTALabel = styled(FormInputLabel)`
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
`;

export const CTAButton = styled.button`
  border-style: solid;
  border-radius: 10px;
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
  padding: 8px 16px 8px 16px;
  cursor: pointer;
`;
