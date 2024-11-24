import { IoIosWarning } from "react-icons/io";
import {
  SC_ErrorMessageContainer,
  SC_ErrorText,
  SC_IconContainer,
} from "./styles";

type Props = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: Props) => {
  return (
    <SC_ErrorMessageContainer>
      <SC_IconContainer>
        <IoIosWarning />
      </SC_IconContainer>
      <SC_ErrorText>{errorMessage}</SC_ErrorText>
    </SC_ErrorMessageContainer>
  );
};

export default ErrorMessage;
