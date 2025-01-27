import { IoCloseCircle } from "react-icons/io5";
import { ReactNode, useContext, useState } from "react";

import { SC_Popup, SC_TagAddButton } from "./styles";
import { UpdateContext, UpdateContextType } from "../../context/UpdateContext";
import { addTagToTask } from "../../API/tasksAPI";

type Props = {
  taskId: string;
  hasCustomAdd?: boolean;
  customAddFn?: (tagList: string[]) => void;
};

const initiateAPI = async (
  taskId: string,
  tagList: string[],
  triggerUpdate: () => void
) => {
  await addTagToTask(taskId, tagList);
  triggerUpdate();
};

// Has list of tags to add internally. No need to rely on other component state.
// Custom add function itself will and should take care of state changes and not this component.
const PopupForm = ({
  taskId,
  hasCustomAdd,
  customAddFn,
  close,
}: Props & { close: () => void }): ReactNode => {
  const [tagList, setTagList] = useState<string[]>([]);
  const { triggerUpdate } = useContext(UpdateContext) as UpdateContextType;

  const onClickInitiateAPI = async () => {
    try {
      if (hasCustomAdd && customAddFn !== undefined) {
        customAddFn(tagList);
      } else {
        await initiateAPI(taskId, tagList, triggerUpdate);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <SC_PopupFormText>Do you want to remove this tag?</SC_PopupFormText>
      <SC_PopupButtonContainer>
        <SC_DeleteButton onClick={onClickInitiateAPI}>
          <IoCloseCircle style={STYLE_ICON_MARGINS} />
          Remove
        </SC_DeleteButton>
        <SC_PopupActionButton onClick={close}>Cancel</SC_PopupActionButton>
      </SC_PopupButtonContainer>
    </>
  );
};

export const AddTagPopupButton = ({
  taskId,
  customAddFn,
  hasCustomAdd,
}: Props) => {
  return (
    <SC_Popup
      trigger={() => (
        <SC_TagAddButton>
          <IoCloseCircle />
        </SC_TagAddButton>
      )}
      position="bottom right"
    >
      {/* Thanks to this reactjs-popup library not being maintained for over 2 year,
        it does not have any function signature in the type declaration.
        So this line below will show a TS error even though this is the intended
        way to pass this close prop for controlling closing of any popup.

        The code below WILL work just fine. But it will show a TS error.
          
        @ts-expect-error Added due to package not having valid declaration for functional props.*/}
      {(close) => (
        <PopupForm
          taskId={taskId}
          customAddFn={customAddFn}
          hasCustomAdd={hasCustomAdd}
          close={close}
        />
      )}
    </SC_Popup>
  );
};
