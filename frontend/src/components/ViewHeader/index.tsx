import {
  SC_ButtonContainer,
  SC_HeaderContainer,
  SC_HeaderTextContainer,
  SC_TopHeader1,
  SC_TopHeader2,
} from "./styles";
import { AddEditButton } from "../AddEditButton";
import { ReactNode } from "react";

type Props = {
  h1Text: string | ReactNode;
  h2Text?: string | ReactNode;
  addButtonText?: string;
  editButtonText?: string;
};

const ViewHeader = ({
  h1Text,
  h2Text,
  addButtonText,
  editButtonText,
}: Props) => {
  return (
    <SC_HeaderContainer>
      <SC_HeaderTextContainer>
        <SC_TopHeader1>{h1Text}</SC_TopHeader1>
        {h2Text === undefined ? <></> : <SC_TopHeader2>{h2Text}</SC_TopHeader2>}
      </SC_HeaderTextContainer>
      <SC_ButtonContainer>
        {addButtonText === undefined ? (
          <></>
        ) : (
          <AddEditButton text={addButtonText} mode="ADD" />
        )}
        {editButtonText === undefined ? (
          <></>
        ) : (
          <AddEditButton text={editButtonText} mode="EDIT" />
        )}
      </SC_ButtonContainer>
    </SC_HeaderContainer>
  );
};

export default ViewHeader;
