import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { SC_AddTagButton } from "./styles";
import { STYLE_ICON_MARGINS } from "../../constants";

type AddButtonProp = {
  mode: "ADD" | "EDIT";
  text: string;
  onClick?: () => void
};

export const AddEditModalPopup = ({ text, mode, onClick }: AddButtonProp) => {
  return (
    <SC_AddTagButton title={text} onClick={onClick}>
      {mode === "ADD" ? (
        <AiFillPlusCircle style={STYLE_ICON_MARGINS} />
      ) : (
        <MdEditSquare style={STYLE_ICON_MARGINS} />
      )}
      {text}
    </SC_AddTagButton>
  );
};
