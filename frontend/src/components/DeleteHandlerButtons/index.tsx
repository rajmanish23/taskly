import { MdDelete } from 'react-icons/md';
import { FaTrashRestoreAlt } from "react-icons/fa";

import { SC_DeleteButton, SC_RestoreButton } from './styles';

export const DeletePopupButton = () => {
  return (
    <SC_DeleteButton>
      <MdDelete />
    </SC_DeleteButton>
  );
}

export const RestoreDeletePopupButton = () => {
  return (
    <SC_RestoreButton>
      <FaTrashRestoreAlt />
    </SC_RestoreButton>
  );
}