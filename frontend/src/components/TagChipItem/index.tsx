import { FaHashtag } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useContext } from "react";

import { UpdateContext, UpdateContextType } from "../../context/UpdateContext";
import { STYLE_ICON_MARGINS } from "../../constants";
import { removeTagFromTask } from "../../API/tasksAPI";
import { SC_TagItemContainer, SC_TagRemoveButton } from "./styles";
import isColorDark from "../../utils/isColorDark";

type Props = {
  data: Tag;
  taskId?: string;
  isClickable: boolean;
  isBigDisplay: boolean;
  clickFn?: () => void;
  removeFn?: () => void;
};

const initiateRemoveTagAPI = async (taskId: string, tagId: string) => {
  try {
    const res = await removeTagFromTask(taskId, tagId);
    if (res.isError) {
      console.log(res.detail);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const TagChipItem = ({
  data,
  taskId,
  isClickable,
  isBigDisplay,
  clickFn,
  removeFn,
}: Props) => {
  const { triggerUpdate } = useContext(UpdateContext) as UpdateContextType;

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
    }
    if (taskId === undefined) 
      throw new Error("Remove tag button needs associated task ID!");
    await initiateRemoveTagAPI(taskId, data.sId);
    triggerUpdate();
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
      {isClickable && (
        <SC_TagRemoveButton onClick={onClickRemove}>
          <IoCloseCircle />
        </SC_TagRemoveButton>
      )}
    </SC_TagItemContainer>
  );
};

export default TagChipItem;
