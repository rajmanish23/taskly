import { useEffect } from "react";
import { IoIosWarning } from "react-icons/io";
import {
  SC_ErrorMessageContainer,
  SC_ErrorText,
  SC_IconContainer,
} from "./styles";

type Props = {
  errorMessage: string;
  isDismissable: boolean;
  show?: boolean;
  setShow?: (show: boolean) => void;
};

const ErrorMessage = ({
  isDismissable,
  errorMessage,
  setShow,
  show,
}: Props) => {
  useEffect(() => {
    if (!isDismissable) return;
    if (show === undefined || setShow === undefined)
      throw new Error("show and setShow must be defined for auto dismiss");
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [show, setShow, isDismissable]);

  if (!show) return null;

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
