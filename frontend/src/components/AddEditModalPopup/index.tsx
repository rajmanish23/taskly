import { forwardRef, LegacyRef, useRef, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { FaSave, FaCalendarCheck } from "react-icons/fa";

import {
  SC_AddTagButton,
  SC_DateDisplayPickerButton,
  SC_DatePickerContainer,
  SC_DescriptionInput,
  SC_DetailsInputContainer,
  SC_ModalTagItemContainer,
  SC_NameInput,
  SC_OverlayBGContainer,
  SC_PopupCloseButton,
  SC_PopupContentContainer,
  SC_SaveButton,
  SC_TopHeaderRowContainer,
  SC_TopModeHeader,
  SC_TopRowLeftContainer,
  SC_TopWhatHeader,
} from "./styles";
import { STYLE_ICON_MARGINS } from "../../constants";
import { isTag } from "../../utils/objectTypeCheckers";
import isColorDark from "../../utils/isColorDark";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

type CommonProps = {
  mode: "CREATE" | "EDIT";
  what: "TAG" | "TASK" | "SUBTASK";
  where?: Tag | Task;
};

type ContentProps = CommonProps & {
  closeFn: () => void;
};

type DateDisplayProps = {
  value?: string;
  onClick?: () => void;
};

const AddEditForm = ({ closeFn, mode, what, where }: ContentProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const contentRef = useRef<HTMLDivElement>(null);

  const closeOnBgClick = (e: React.MouseEvent) => {
    if (contentRef.current === e.target) {
      closeFn();
    }
  };

  const DateDisplay = forwardRef(
    (
      { value, onClick }: DateDisplayProps,
      ref: LegacyRef<HTMLButtonElement>
    ) => (
      <SC_DateDisplayPickerButton onClick={onClick} ref={ref} $isError={false}>
        <FaCalendarCheck style={STYLE_ICON_MARGINS} />
        {value}
      </SC_DateDisplayPickerButton>
    )
  );

  return (
    <SC_OverlayBGContainer ref={contentRef} onClick={closeOnBgClick}>
      <SC_PopupContentContainer>
        <SC_TopHeaderRowContainer>
          <SC_TopRowLeftContainer>
            <SC_PopupCloseButton onClick={closeFn}>
              <IoCloseCircle />
            </SC_PopupCloseButton>
            <SC_TopModeHeader className="top-header">
              {mode === "CREATE" ? "Creating" : "Editing"}
            </SC_TopModeHeader>
            <SC_TopWhatHeader className="top-what-header">
              {what === "SUBTASK"
                ? "Sub-Task"
                : what === "TAG"
                ? "Tag"
                : "Task"}
            </SC_TopWhatHeader>
            {mode === "CREATE" ? (
              where === undefined ? (
                <></>
              ) : isTag(where) ? (
                <>
                  <SC_TopModeHeader className="top-header">in</SC_TopModeHeader>
                  <SC_ModalTagItemContainer
                    key={where.sId}
                    $color={where.colorHex}
                    $isColorDark={isColorDark(where.colorHex)}
                  >
                    <FaHashtag style={STYLE_ICON_MARGINS} />
                    {where.name}
                  </SC_ModalTagItemContainer>
                </>
              ) : (
                <>
                  <SC_TopModeHeader className="top-header">in</SC_TopModeHeader>
                  <SC_TopWhatHeader className="top-where-header">
                    {where.name}
                  </SC_TopWhatHeader>
                </>
              )
            ) : (
              <></>
            )}
          </SC_TopRowLeftContainer>
          <SC_SaveButton className="save-button">
            <>
              <FaSave style={STYLE_ICON_MARGINS} />
              Save
            </>
          </SC_SaveButton>
        </SC_TopHeaderRowContainer>

        <SC_DetailsInputContainer className="details-input-container">
          <SC_NameInput
            type="text"
            id="nameInput"
            name="nameInput"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            $isError={false}
          />
          {what === "TASK" ? (
            <SC_DescriptionInput
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="descriptionInput"
              id="descriptionInput"
              placeholder="Description"
              $isError={false}
              rows={5}
            />
          ) : (
            <></>
          )}
          {what !== "TAG" ? (
            <SC_DatePickerContainer>
              <DatePicker
                selected={date}
                onChange={(date) => {
                  if (date === null) {
                    return;
                  }
                  setDate(date);
                }}
                toggleCalendarOnIconClick
                timeInputLabel="Time:"
                dateFormat="Pp"
                showTimeInput
                minDate={subDays(new Date(), 0)}
                customInput={<DateDisplay />}
              />
            </SC_DatePickerContainer>
          ) : (
            <></>
          )}
          {what === "TASK" ? (
            <>
              <p>Tag: </p>
            </>
          ) : (
            <></>
          )}
        </SC_DetailsInputContainer>
      </SC_PopupContentContainer>
    </SC_OverlayBGContainer>
  );
};

type AddButtonProp = CommonProps & {
  text: string;
};

export const AddEditModalPopup = ({
  text,
  mode,
  what,
  where,
}: AddButtonProp) => {
  const [showModal, setShowModal] = useState(false);

  const onClickToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <SC_AddTagButton title={text} onClick={onClickToggleModal}>
        {mode === "CREATE" ? (
          <AiFillPlusCircle style={STYLE_ICON_MARGINS} />
        ) : (
          <MdEditSquare style={STYLE_ICON_MARGINS} />
        )}
        {text}
      </SC_AddTagButton>
      {showModal && (
        <AddEditForm
          closeFn={onClickToggleModal}
          mode={mode}
          what={what}
          where={where}
        />
      )}
    </>
  );
};
