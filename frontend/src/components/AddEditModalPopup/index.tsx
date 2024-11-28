import { useRef, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

import {
  SC_AddTagButton,
  SC_OverlayBGContainer,
  SC_PopupCloseButton,
  SC_PopupContentContainer,
  SC_PopupHeader,
  SC_PopupPara,
} from "./styles";
import { STYLE_ICON_MARGINS } from "../../constants";

type ContentProps = {
  closeFn: () => void;
};

const AddEditForm = ({ closeFn }: ContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const closeOnBgClick = (e: React.MouseEvent) => {
    if (contentRef.current === e.target) {
      closeFn();
    }
  };

  return (
    <SC_OverlayBGContainer ref={contentRef} onClick={closeOnBgClick}>
      <SC_PopupContentContainer>
        <SC_PopupHeader>Lorem ipsum dolor sit amet consectetur</SC_PopupHeader>
        <SC_PopupPara>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus iure
          autem veniam, unde quasi similique amet optio ipsa corrupti, harum quo
          enim tempora? Nihil rerum vitae eum odio! Consequatur, rerum.
        </SC_PopupPara>
        <br />
        <SC_PopupCloseButton onClick={closeFn}>Close Modal</SC_PopupCloseButton>
      </SC_PopupContentContainer>
    </SC_OverlayBGContainer>
  );
};

type AddButtonProp = {
  mode: "ADD" | "EDIT";
  text: string;
};

export const AddEditModalPopup = ({ text, mode }: AddButtonProp) => {
  const [showModal, setShowModal] = useState(false);

  const onClickToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <SC_AddTagButton title={text} onClick={onClickToggleModal}>
        {mode === "ADD" ? (
          <AiFillPlusCircle style={STYLE_ICON_MARGINS} />
        ) : (
          <MdEditSquare style={STYLE_ICON_MARGINS} />
        )}
        {text}
      </SC_AddTagButton>
      {showModal && <AddEditForm closeFn={onClickToggleModal} />}
    </>
  );
};
