import { AiFillPlusCircle } from "react-icons/ai";
import { SC_AddTagButton } from "./styles";
import { STYLE_ICON_MARGINS } from "../../constants";

type AddButtonProp = {
  text: string;
};

export const AddButton = ({ text }: AddButtonProp) => {
  return (
    <SC_AddTagButton title={text}>
      <AiFillPlusCircle style={STYLE_ICON_MARGINS} />
      {text}
    </SC_AddTagButton>
  );
};
