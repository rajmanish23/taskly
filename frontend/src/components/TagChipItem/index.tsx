import { FaHashtag } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

import { STYLE_ICON_MARGINS } from "../../constants";
import { SC_TagItemContainer, SC_TagRemoveButton } from "./styles";
import isColorDark from "../../utils/isColorDark";
import { DeleteRestorePopupButton } from "../DeleteHandlerButtons";

type Props = {
  data: Tag;
  taskId?: string;
  isClickable: boolean;
  hasCustomRemove?: boolean;
  isBigDisplay: boolean;
  clickFn?: () => void;
  removeFn?: () => void;
};

const TagChipItem = ({
  data,
  taskId,
  isClickable,
  hasCustomRemove,
  isBigDisplay,
  clickFn,
  removeFn,
}: Props) => {
  const onClickNavigate = (e: React.MouseEvent) => {
    if (!isClickable) return;
    if (e.target instanceof HTMLLIElement && clickFn !== undefined) clickFn();
  };

  const onClickRemove = async (e: React.MouseEvent) => {
    if (e.target! instanceof HTMLLIElement) return;
    if (!isClickable) return;
    if (removeFn !== undefined) {
      removeFn();
      return;
    } else {
      throw new Error(
        "Need custom remove function if 'hasCustomRemove' is true"
      );
    }
  };

  return (
    <SC_TagItemContainer
      $color={data.colorHex}
      $isColorDark={isColorDark(data.colorHex)}
      $isClickable={isClickable}
      $isBigDisplay={isBigDisplay}
      onClick={onClickNavigate}
    >
      <FaHashtag style={STYLE_ICON_MARGINS} />
      {data.name}
      {isClickable ? (
        hasCustomRemove ? (
          <SC_TagRemoveButton onClick={onClickRemove}>
            <IoCloseCircle />
          </SC_TagRemoveButton>
        ) : (
          <DeleteRestorePopupButton
            id={data.sId}
            mode="TAG_REMOVE"
            what="TAG_REMOVE"
            parentId={taskId}
          />
        )
      ) : (
        <></>
      )}
    </SC_TagItemContainer>
  );
};

export default TagChipItem;
