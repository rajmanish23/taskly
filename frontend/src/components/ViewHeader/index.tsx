import {
  SC_HeaderContainer,
  SC_HeaderTextContainer,
  SC_TopHeader1,
  SC_TopHeader2,
} from "./styles";
import { AddButton } from "../AddButton";
import { ReactNode } from "react";

type Props = {
  h1Text: string | ReactNode;
  h2Text?: string | ReactNode;
  addButtonText?: string;
};

const ViewHeader = ({ h1Text, h2Text, addButtonText }: Props) => {
  return (
    <SC_HeaderContainer>
      <SC_HeaderTextContainer>
        <SC_TopHeader1>{h1Text}</SC_TopHeader1>
        {h2Text === undefined ? <></> : <SC_TopHeader2>{h2Text}</SC_TopHeader2>}
      </SC_HeaderTextContainer>
      {addButtonText === undefined ? <></> : <AddButton text={addButtonText} />}
    </SC_HeaderContainer>
  );
};

export default ViewHeader;
