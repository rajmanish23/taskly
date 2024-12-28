import { MdDelete } from "react-icons/md";
import { FaTrashRestoreAlt } from "react-icons/fa";

import {
  SC_DeleteButton,
  SC_Popup,
  SC_PopupActionButton,
  SC_PopupButtonContainer,
  SC_PopupFormText,
  SC_RestoreButton,
} from "./styles";
import { ReactNode } from "react";

type Props = {
  what: "TASK" | "TAG" | "SUB_TASK";
  id: string;
  mode: "DELETE" | "PERMA_DELETE" | "RESTORE";
};

const initiateAPI = async ({ id, mode, what }: Props) => {
  if (what === "TASK") {
    if (mode === "DELETE") {
      await deleteTask(id);
    } else if (mode === "PERMA_DELETE") {
      await permanentlyDeleteTask(id);
    } else {
      await restoreTask(id);
    }
  } else if (what === "TAG") {
    if (mode === "DELETE") {
      await deleteTag(id);
    } else if (mode === "PERMA_DELETE") {
      await permanentlyDeleteTag(id);
    } else {
      await restoreTag(id);
    }
  } else {
    if (mode === "PERMA_DELETE") {
      await permanentlyDeleteSubTask(id);
    } else {
      throw new Error(
        "Invalid mode for sub task! Only PERMA_DELETE is allowed."
      );
    }
  }
};

const PopupForm = ({
  id,
  what,
  mode,
  close,
}: Props & { close: () => void }): ReactNode => {
  const onClickInitiateAPI = async () => {
    try {
      await initiateAPI({id, what, mode});
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
            <MdDelete />
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
            <MdDelete />
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
            <FaTrashRestoreAlt />
            Restore
          </SC_RestoreButton>
          <SC_PopupActionButton onClick={close}>Cancel</SC_PopupActionButton>
        </SC_PopupButtonContainer>
      </>
    );
  }
};

export const DeleteRestorePopupButton = ({ id, what, mode }: Props) => {
  return (
    <SC_Popup
      trigger={() => {
        if (mode === "RESTORE") {
          return (
            <SC_RestoreButton>
              <FaTrashRestoreAlt />
            </SC_RestoreButton>
          );
        } else {
          return (
            <SC_DeleteButton>
              <MdDelete />
            </SC_DeleteButton>
          );
        }
      }}
      position="bottom right"
    >
      {/* Thanks to this reactjs-popup library not being maintained for over 2 year,
        it does not have any function signature in the type declaration.
        So this line below will show a TS error even though this is the intended
        way to pass this close prop for controlling closing of any popup.

        The code below WILL work just fine. But it will show a TS error.
          
        @ts-expect-error Added due to package not having valid declaration for functional props.*/}
      {(close) => <PopupForm id={id} what={what} mode={mode} close={close} />}
    </SC_Popup>
  );
};
