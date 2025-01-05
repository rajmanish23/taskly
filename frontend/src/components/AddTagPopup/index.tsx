import { IoCloseCircle } from "react-icons/io5";
import { ReactNode, useContext } from "react";

import { SC_Popup, SC_TagAddButton } from "./styles";
import { UpdateContext, UpdateContextType } from "../../context/UpdateContext";

type Props = {
  taskId?: string;
  hasCustomAdd?: boolean;
  tagListState?: Tag[];
  addToTagList?: () => void;
};

const PopupForm = ({
  taskId,
  tagListState,
  hasCustomAdd,
  addToTagList,
  close,
}: Props & { close: () => void }): ReactNode => {
  const { triggerUpdate } = useContext(UpdateContext) as UpdateContextType;

  const onClickInitiateAPI = async () => {
    try {
      await initiateAPI(
        triggerUpdate
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (mode === "DELETE") {
    return (
      <>
        <SC_PopupFormText>Do you want to delete this?</SC_PopupFormText>
        <SC_PopupButtonContainer>
          <SC_DeleteButton onClick={onClickInitiateAPI}>
            <MdDelete style={STYLE_ICON_MARGINS} />
            Delete
          </SC_DeleteButton>
          <SC_PopupActionButton onClick={close}>Cancel</SC_PopupActionButton>
        </SC_PopupButtonContainer>
      </>
    );
  }
  if (mode === "PERMA_DELETE") {
    return (
      <>
        <SC_PopupFormText>
          Do you want to permanently delete this?
        </SC_PopupFormText>
        <SC_PopupButtonContainer>
          <SC_DeleteButton onClick={onClickInitiateAPI}>
            <MdDelete style={STYLE_ICON_MARGINS} />
            Delete
          </SC_DeleteButton>
          <SC_PopupActionButton onClick={close}>Cancel</SC_PopupActionButton>
        </SC_PopupButtonContainer>
      </>
    );
  }
  if (mode === "RESTORE") {
    return (
      <>
        <SC_PopupFormText>Do you want to restore this?</SC_PopupFormText>
        <SC_PopupButtonContainer>
          <SC_RestoreButton onClick={onClickInitiateAPI}>
            <FaTrashRestoreAlt style={STYLE_ICON_MARGINS} />
            Restore
          </SC_RestoreButton>
          <SC_PopupActionButton onClick={close}>Cancel</SC_PopupActionButton>
        </SC_PopupButtonContainer>
      </>
    );
  }
  if (mode === "TAG_REMOVE") {
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
  }
};

export const DeleteRestorePopupButton = ({ taskId, addToTagList, hasCustomAdd, tagListState }: Props) => {
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
          addToTagList={addToTagList}
          hasCustomAdd={hasCustomAdd}
          tagListState={tagListState}
          close={close}
        />
      )}
    </SC_Popup>
  );
};
