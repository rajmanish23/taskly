import { useRef, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";

import {
  SC_AddTagButton,
  SC_OverlayBGContainer,
  SC_PopupCloseButton,
  SC_PopupContentContainer,
} from "./styles";
import { STYLE_ICON_MARGINS } from "../../constants";
import { isTag } from "../../utils/objectTypeCheckers";
import { SC_TagItemContainer } from "../commonStyles";
import isColorDark from "../../utils/isColorDark";

type CommonProps = {
  mode: "CREATE" | "EDIT";
  what: "TAG" | "TASK" | "SUBTASK";
  where?: Tag | Task;
};

type ContentProps = CommonProps & {
  closeFn: () => void;
};

const AddEditForm = ({ closeFn, mode, what, where }: ContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const closeOnBgClick = (e: React.MouseEvent) => {
    if (contentRef.current === e.target) {
      closeFn();
    }
  };

  return (
    <SC_OverlayBGContainer ref={contentRef} onClick={closeOnBgClick}>
      <SC_PopupContentContainer>
        <div className="top-header-row">
          <div className="top-row-left-container">
            <SC_PopupCloseButton onClick={closeFn}>
              <IoCloseCircle />
            </SC_PopupCloseButton>
            <h1 className="top-header">
              {mode === "CREATE" ? "Creating" : "Editing"}
            </h1>
            <h1 className="top-what-header">
              {what === "SUBTASK"
                ? "Sub-Task"
                : what === "TAG"
                ? "Tag"
                : "Task"}
            </h1>
            {mode === "CREATE" ? (
              where === undefined ? (
                <></>
              ) : isTag(where) ? (
                <>
                  <h1 className="top-header">in</h1>
                  <SC_TagItemContainer
                    key={where.sId}
                    $color={where.colorHex}
                    $isColorDark={isColorDark(where.colorHex)}
                  >
                    <FaHashtag style={STYLE_ICON_MARGINS} />
                    {where.name}
                  </SC_TagItemContainer>
                </>
              ) : (
                <>
                  <h1 className="top-header">in</h1>
                  <h1 className="top-where-header">{where.name}</h1>
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </SC_PopupContentContainer>
    </SC_OverlayBGContainer>
  );
};

type AddButtonProp = CommonProps & {
  text: string;
};

export const AddEditModalPopup = ({
  text,
  mode,
  what,
  where,
}: AddButtonProp) => {
  const [showModal, setShowModal] = useState(false);

  const onClickToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <SC_AddTagButton title={text} onClick={onClickToggleModal}>
        {mode === "CREATE" ? (
          <AiFillPlusCircle style={STYLE_ICON_MARGINS} />
        ) : (
          <MdEditSquare style={STYLE_ICON_MARGINS} />
        )}
        {text}
      </SC_AddTagButton>
      {showModal && (
        <AddEditForm
          closeFn={onClickToggleModal}
          mode={mode}
          what={what}
          where={where}
        />
      )}
    </>
  );
};
