import { FaHashtag } from "react-icons/fa6";
import { STYLE_ICON_MARGINS } from "../../constants";
import isColorDark from "../../utils/isColorDark";
import { SC_TagItemContainer } from "./styles";

type Props = {
  data: {
    name: string;
    colorHex: string;
  };
  isClickable: boolean;
  isBigDisplay: boolean;
  clickFn?: () => void;
}

const TagChipItem = ({data, isClickable, isBigDisplay, clickFn}: Props) => {
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
}

export default TagChipItem