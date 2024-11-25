import { ChangeEvent } from "react";
import { SC_ErrorText, SC_FormInput, SC_FormInputLabel } from "./style";

type Props = {
  name: string;
  value: string;
  isError: boolean;
  errorMessage: string;
  type: "text" | "password";
  changeEventHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = (props: Props) => {
  const { changeEventHandler, isError, name, value, errorMessage, type } =
    props;
  return (
    <>
      <SC_FormInputLabel htmlFor={name} $isError={isError}>
        {name}
      </SC_FormInputLabel>
      <SC_FormInput
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={changeEventHandler}
        $isError={isError}
      />
      {isError ? <SC_ErrorText>{"* " + errorMessage}</SC_ErrorText> : null}
    </>
  );
};

export default FormInput;
