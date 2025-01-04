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
import { ReactNode, useContext } from "react";
import {
  deleteTask,
  permanentlyDeleteTask,
  restoreTask,
} from "../../API/tasksAPI";
import { deleteTag, permanentlyDeleteTag, restoreTag } from "../../API/tagsAPI";
import { permanentlyDeleteSubTask } from "../../API/subTasksAPI";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PageContext, PageContextType } from "../../context/PageContext";
import { STYLE_ICON_MARGINS, TODAY_PAGE_URL } from "../../constants";
import { UpdateContext, UpdateContextType } from "../../context/UpdateContext";

type Props = {
  what: "TASK" | "TAG" | "SUB_TASK" | "TASK_LIST";
  id: string;
  mode: "DELETE" | "PERMA_DELETE" | "RESTORE";
  buttonText?: string;
  // resetFunc?: () => void;
};

const initiateAPI = async (
  { id, mode, what }: Props,
  navigate: NavigateFunction,
  previousPage: string,
  triggerUpdate: () => void
) => {
  if (what === "TASK") {
    if (mode === "DELETE") {
      await deleteTask(id);
      navigate(previousPage);
    } else if (mode === "PERMA_DELETE") {
      await permanentlyDeleteTask(id);
      navigate(previousPage);
    } else {
      await restoreTask(id);
      triggerUpdate();
    }
  } else if (what === "TAG") {
    if (mode === "DELETE") {
      await deleteTag(id);
      navigate(TODAY_PAGE_URL);
    } else if (mode === "PERMA_DELETE") {
      await permanentlyDeleteTag(id);
      navigate(TODAY_PAGE_URL);
    } else {
      await restoreTag(id);
      triggerUpdate();
    }
  } else if (what === "TASK_LIST") {
    if (mode === "PERMA_DELETE") {
      await permanentlyDeleteTask(id);
      triggerUpdate();
    } else if (mode === "RESTORE") {
      await restoreTask(id);
      triggerUpdate();
    } else {
      await deleteTask(id);
      triggerUpdate()
    }
  } else {
    if (mode === "PERMA_DELETE") {
      await permanentlyDeleteSubTask(id);
      triggerUpdate();
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
  const navigate = useNavigate();
  const { previousPage } = useContext(PageContext) as PageContextType;
  const { triggerUpdate } = useContext(
    UpdateContext
  ) as UpdateContextType;

  const onClickInitiateAPI = async () => {
    try {
      await initiateAPI(
        { id, what, mode },
        navigate,
        previousPage,
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

export const DeleteRestorePopupButton = ({
  id,
  what,
  mode,
  buttonText,
}: Props) => {
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
              <MdDelete
                style={
                  buttonText === undefined ? undefined : STYLE_ICON_MARGINS
                }
              />
              {buttonText}
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
