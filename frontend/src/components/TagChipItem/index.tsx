import { FaHashtag } from "react-icons/fa6";
import { STYLE_ICON_MARGINS } from "../../constants";
import isColorDark from "../../utils/isColorDark";
import { SC_TagItemContainer } from "./styles";
import { removeTagFromTask } from "../../API/tasksAPI";

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

const TagChipItem = ({ data, isClickable, isBigDisplay, clickFn }: Props) => {
  return (
    <SC_TagItemContainer
      $color={data.colorHex}
      $isColorDark={isColorDark(data.colorHex)}
      $isClickable={isClickable}
      $isBigDisplay={isBigDisplay}
      onClick={clickFn}
    >
      <FaHashtag style={STYLE_ICON_MARGINS} />
      {data.name}
    </SC_TagItemContainer>
  );
};

export default TagChipItem;
