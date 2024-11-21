import { AiFillPlusCircle } from "react-icons/ai";
import { SC_AddTagButton } from "./styles";

type AddButtonProp = {
  text: string;
};

export const AddButton = ({ text }: AddButtonProp) => {
  return (
    <SC_AddTagButton title={text}>
      <AiFillPlusCircle style={{ marginRight: 5 }} />
      {text}
    </SC_AddTagButton>
  );
};
