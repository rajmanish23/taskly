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

type Props = {
  what: "TASK" | "TAG" | "SUB_TASK";
  id: string;
  mode: "DELETE" | "PERMA_DELETE" | "RESTORE";
};

const PopupForm = ({ id, what, mode }: Props) => {
  console.log(what, mode);
  if (mode === "DELETE") {
    return (
      <>
        <SC_PopupFormText>Do you want to delete this?</SC_PopupFormText>
        <SC_PopupButtonContainer>
          <SC_DeleteButton>
            <MdDelete />
            Delete
          </SC_DeleteButton>
          <SC_PopupActionButton>Cancel</SC_PopupActionButton>
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
          <SC_DeleteButton>
            <MdDelete />
            Delete
          </SC_DeleteButton>
          <SC_PopupActionButton>Cancel</SC_PopupActionButton>
        </SC_PopupButtonContainer>
      </>
    );
  }
  if (mode === "RESTORE") {
    return (
      <>
        <SC_PopupFormText>Do you want to restore this?</SC_PopupFormText>
        <SC_PopupButtonContainer>
          <SC_RestoreButton>
            <FaTrashRestoreAlt />
            Restore
          </SC_RestoreButton>
          <SC_PopupActionButton>Cancel</SC_PopupActionButton>
        </SC_PopupButtonContainer>
      </>
    );
  }
};

export const DeleteRestorePopupButton = ({ id, what, mode }: Props) => {
  return (
    <SC_Popup
      trigger={() => {
        if (mode === "DELETE") {
          return (
            <SC_DeleteButton>
              <MdDelete />
            </SC_DeleteButton>
          );
        } else if (mode === "PERMA_DELETE") {
          return (
            <SC_DeleteButton>
              <MdDelete />
            </SC_DeleteButton>
          );
        } else {
          return (
            <SC_RestoreButton>
              <FaTrashRestoreAlt />
            </SC_RestoreButton>
          );
        }
      }}
      position="bottom right"
    >
      <PopupForm id={id} what={what} mode={mode} />
    </SC_Popup>
  );
};
