import { IoArrowBackSharp } from "react-icons/io5";
import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  SC_BackButton,
  SC_ButtonContainer,
  SC_HeaderContainer,
  SC_HeaderTextContainer,
  SC_TopHeader1,
  SC_TopHeader2,
} from "./styles";
import { AddEditModalPopup } from "../AddEditModalPopup";
import { PageContext, PageContextType } from "../../context/PageContext";
import { DeleteRestorePopupButton } from "../DeleteHandlerButtons";

type Props = {
  h1Text: string | ReactNode;
  h2Text?: string | ReactNode;
  mode?: "CREATE" | "EDIT";
  addButtonText?: string;
  editButtonText?: string;
  hasBackButton?: boolean;
  addWhat?: "TAG" | "TASK" | "SUBTASK";
  addWhere?: Tag | Task;
  editWhat?: "TAG" | "TASK" | "SUBTASK";
  currentData?: DataState;
  deleteItemText?: string;
  previousPage_manual?: string;
};

const ViewHeader = ({
  h1Text,
  h2Text,
  addButtonText,
  editButtonText,
  hasBackButton,
  addWhat,
  addWhere,
  editWhat,
  currentData,
  deleteItemText,
  previousPage_manual,
}: Props) => {
  const { previousPage } = useContext(PageContext) as PageContextType;
  const navigate = useNavigate();
  return (
    <SC_HeaderContainer>
      <SC_HeaderTextContainer>
        {hasBackButton ? (
          <SC_BackButton
            onClick={() =>
              navigate(
                previousPage_manual !== undefined
                  ? previousPage_manual
                  : previousPage
              )
            }
          >
            <IoArrowBackSharp />
          </SC_BackButton>
        ) : (
          <></>
        )}
        <SC_TopHeader1>{h1Text}</SC_TopHeader1>
        {h2Text === undefined ? <></> : <SC_TopHeader2>{h2Text}</SC_TopHeader2>}
      </SC_HeaderTextContainer>
      <SC_ButtonContainer>
        {addButtonText === undefined || addWhat === undefined ? (
          <></>
        ) : (
          <AddEditModalPopup
            text={addButtonText}
            mode="CREATE"
            what={addWhat}
            where={addWhere}
          />
        )}
        {editButtonText === undefined || editWhat === undefined ? (
          <></>
        ) : (
          <AddEditModalPopup
            text={editButtonText}
            mode="EDIT"
            what={editWhat}
            data={currentData}
          />
        )}
        {deleteItemText === undefined || currentData === undefined ? (
          <></>
        ) : (
          <DeleteRestorePopupButton
            id={currentData.sId}
            mode="DELETE"
            what="TAG"
            buttonText={deleteItemText}
          />
        )}
      </SC_ButtonContainer>
    </SC_HeaderContainer>
  );
};

export default ViewHeader;
