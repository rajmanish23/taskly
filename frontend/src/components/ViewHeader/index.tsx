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

type Props = {
  h1Text: string | ReactNode;
  h2Text?: string | ReactNode;
  addButtonText?: string;
  editButtonText?: string;
  hasBackButton?: boolean;
};

const ViewHeader = ({
  h1Text,
  h2Text,
  addButtonText,
  editButtonText,
  hasBackButton,
}: Props) => {
  const { previousPage } = useContext(
    PageContext
  ) as PageContextType;
  const navigate = useNavigate();
  return (
    <SC_HeaderContainer>
      <SC_HeaderTextContainer>
        {hasBackButton ? (
          <SC_BackButton onClick={() => navigate(previousPage)}>
            <IoArrowBackSharp />
          </SC_BackButton>
        ) : (
          <></>
        )}
        <SC_TopHeader1>{h1Text}</SC_TopHeader1>
        {h2Text === undefined ? <></> : <SC_TopHeader2>{h2Text}</SC_TopHeader2>}
      </SC_HeaderTextContainer>
      <SC_ButtonContainer>
        {addButtonText === undefined ? (
          <></>
        ) : (
          <AddEditModalPopup text={addButtonText} mode="ADD" />
        )}
        {editButtonText === undefined ? (
          <></>
        ) : (
          <AddEditModalPopup text={editButtonText} mode="EDIT" />
        )}
      </SC_ButtonContainer>
    </SC_HeaderContainer>
  );
};

export default ViewHeader;
