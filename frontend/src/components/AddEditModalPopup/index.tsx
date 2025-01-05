import {
  ChangeEvent,
  forwardRef,
  LegacyRef,
  useContext,
  useRef,
  useState,
} from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FaSave, FaCalendarCheck, FaHashtag } from "react-icons/fa";
import { subDays } from "date-fns";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import BeatLoader from "react-spinners/BeatLoader";

import {
  SC_ShowAddEditModalButton,
  SC_DateDisplayPickerButton,
  SC_DatePickerContainer,
  SC_DescriptionInput,
  SC_DetailsInputContainer,
  SC_NameInput,
  SC_OverlayBGContainer,
  SC_PopupCloseButton,
  SC_PopupContentContainer,
  SC_SaveButton,
  SC_TopHeaderRowContainer,
  SC_TopModeHeader,
  SC_TopRowLeftContainer,
  SC_TopWhatHeader,
  SC_ToggleButtonText,
  SC_TopWhereHeader,
  SC_TagColorPickerContainer,
  SC_SelectedColorDisplayContainer,
  SC_SelectedColorDisplayHeader,
  SC_ErrorMessageHolder,
  SC_ModalTagItemContainer,
} from "./styles";
import {
  STYLE_ICON_MARGINS,
  TAG_NAME_CHAR_LIMIT,
  TAG_PAGE_URL_NO_PARAM,
  TASK_PAGE_URL_NO_PARAM,
} from "../../constants";
import { isTag } from "../../utils/objectTypeCheckers";
import { createTag, updateTag } from "../../API/tagsAPI";
import { addTagToTask, createTask, updateTask } from "../../API/tasksAPI";
import { createSubTask, updateSubTask } from "../../API/subTasksAPI";
import { UpdateContext, UpdateContextType } from "../../context/UpdateContext";
import ErrorMessage from "../ErrorMessage";

import "react-datepicker/dist/react-datepicker.css";
import isColorDark from "../../utils/isColorDark";

type CommonProps = {
  mode: "CREATE" | "EDIT";
  what: "TAG" | "TASK" | "SUBTASK";
  where?: Tag | Task;
  data?: DataState;
};

type ContentProps = CommonProps & {
  closeFn: () => void;
};

type DateDisplayProps = {
  value?: string;
  onClick?: () => void;
};

const AddEditForm = ({ closeFn, mode, what, where, data }: ContentProps) => {
  if (mode === "EDIT" && data === undefined) {
    throw new Error(
      "Current state for data to be edited is required for EDIT mode"
    );
  }

  const [name, setName] = useState(data?.name ?? "");
  const [description, setDescription] = useState(data?.description ?? "");
  const [dueDate, setDueDate] = useState<Date | null>(
    data !== undefined && data.dueAt !== undefined ? data.dueAt : new Date()
  );
  const [tagColor, setTagColor] = useState(data?.colorHex ?? "#b49393");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tagList, setTagList] = useState<string[]>(
    where !== undefined && isTag(where) ? [where.sId] : []
  );

  const { triggerUpdate: incrementUpdate } = useContext(
    UpdateContext
  ) as UpdateContextType;

  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const onClickSubmit = async () => {
    setIsLoading(true);
    if (name.length === 0) {
      setErrorMessage("Please enter a name!");
      return;
    }
    if (mode === "CREATE") {
      if (what === "TAG") {
        const status = await createTag({ name, colorHex: tagColor });
        if (status.isError) {
          setErrorMessage(status.detail);
          return;
        }
        closeFn();
        incrementUpdate();
        navigate(TAG_PAGE_URL_NO_PARAM + status.sId);
      } else if (what === "TASK") {
        if (dueDate === null) {
          setErrorMessage("Please enter a due date!");
          return;
        }
        const status = await createTask({ name, description, dueAt: dueDate });
        if (status.isError) {
          setErrorMessage(status.detail);
          return;
        }
        if (isTag(where)) {
          if (status.sId === undefined) {
            setErrorMessage("Task creation failed");
            return;
          }
          const tagStatus = await addTagToTask(status.sId, tagList);
          if (tagStatus.isError) {
            setErrorMessage(tagStatus.detail);
            return;
          }
        }
        closeFn();
        navigate(TASK_PAGE_URL_NO_PARAM + status.sId);
      } else if (what === "SUBTASK") {
        if (where === undefined || isTag(where)) {
          throw new Error("Invalid where for subtask");
        }
        const status = await createSubTask(where.sId, { name, dueAt: dueDate });
        if (status.isError) {
          setErrorMessage(status.detail);
          return;
        }
        closeFn();
        incrementUpdate();
      } else {
        throw new Error("Invalid what");
      }
    } else if (mode === "EDIT") {
      if (data === undefined) {
        throw new Error("Data is required for EDIT mode");
      }
      if (what === "TASK") {
        if (dueDate === null) {
          setErrorMessage("Please enter a due date!");
          return;
        }
        const status = await updateTask(data.sId, {
          name,
          description,
          dueAt: dueDate,
        });
        if (status.isError) {
          setErrorMessage(status.detail);
          return;
        }
        closeFn();
        incrementUpdate();
      } else if (what === "SUBTASK") {
        if (where === undefined || isTag(where)) {
          throw new Error("Invalid where for subtask");
        }
        const status = await updateSubTask(data.sId, { name, dueAt: dueDate });
        if (status.isError) {
          setErrorMessage(status.detail);
          return;
        }
        closeFn();
        incrementUpdate();
      } else if (what === "TAG") {
        const status = await updateTag(data.sId, { name, colorHex: tagColor });
        if (status.isError) {
          setErrorMessage(status.detail);
          return;
        }
        closeFn();
        incrementUpdate();
      } else {
        throw new Error("Invalid what");
      }
    } else {
      throw new Error("Invalid mode");
    }
    setIsLoading(false);
  };

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

  const onChangeUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
    if (what === "TAG" && e.target.value.length > TAG_NAME_CHAR_LIMIT) {
      setErrorMessage(
        `Cannot enter more than ${TAG_NAME_CHAR_LIMIT} characters!`
      );
      return;
    }
    setErrorMessage("");
    setName(e.target.value);
  };

  return (
    <SC_OverlayBGContainer ref={contentRef} onClick={closeOnBgClick}>
      <SC_PopupContentContainer>
        <SC_TopHeaderRowContainer>
          <SC_TopRowLeftContainer>
            <SC_PopupCloseButton onClick={closeFn}>
              <IoCloseCircle />
            </SC_PopupCloseButton>
            <SC_TopModeHeader>
              {mode === "CREATE" ? "Creating" : "Editing"}
            </SC_TopModeHeader>
            {mode === "CREATE" ? (
              <>
                <SC_TopWhatHeader>
                  {what === "SUBTASK"
                    ? "Sub-Task"
                    : what === "TAG"
                    ? "Tag"
                    : "Task"}
                </SC_TopWhatHeader>
                {where === undefined ? (
                  <></>
                ) : isTag(where) ? (
                  <>
                    <SC_TopModeHeader>in</SC_TopModeHeader>
                    <SC_ModalTagItemContainer
                      $bgColor={where.colorHex}
                      $fgIsDark={isColorDark(where.colorHex)}
                    >
                      <FaHashtag style={STYLE_ICON_MARGINS} />
                      {where.name}
                    </SC_ModalTagItemContainer>
                  </>
                ) : (
                  <>
                    <SC_TopModeHeader>in</SC_TopModeHeader>
                    <SC_TopWhereHeader>{where.name}</SC_TopWhereHeader>
                  </>
                )}
              </>
            ) : (
              <>
                {data === undefined ? (
                  <></>
                ) : data.colorHex === undefined ? (
                  <SC_TopWhereHeader>{data?.name}</SC_TopWhereHeader>
                ) : (
                  <SC_ModalTagItemContainer
                    $bgColor={data.colorHex}
                    $fgIsDark={isColorDark(data.colorHex)}
                  >
                    <FaHashtag style={STYLE_ICON_MARGINS} />
                    {data.name}
                  </SC_ModalTagItemContainer>
                )}
              </>
            )}
          </SC_TopRowLeftContainer>
          <SC_SaveButton onClick={onClickSubmit}>
            {isLoading ? (
              <BeatLoader size={10} />
            ) : (
              <>
                <FaSave style={STYLE_ICON_MARGINS} />
                Save
              </>
            )}
          </SC_SaveButton>
        </SC_TopHeaderRowContainer>

        <SC_DetailsInputContainer>
          <SC_NameInput
            type="text"
            id="nameInput"
            name="nameInput"
            placeholder="Name"
            value={name}
            onChange={onChangeUpdateName}
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
                selected={dueDate}
                onChange={(date) => {
                  setDueDate(date);
                }}
                toggleCalendarOnIconClick
                timeInputLabel="Time:"
                dateFormat="Pp"
                showTimeInput
                minDate={subDays(new Date(), 0)}
                isClearable={what === "SUBTASK"}
                customInput={<DateDisplay />}
              />
            </SC_DatePickerContainer>
          ) : (
            <></>
          )}
          {what === "TAG" ? (
            <SC_TagColorPickerContainer>
              <HexColorPicker color={tagColor} onChange={setTagColor} />
              <SC_SelectedColorDisplayContainer>
                <SC_SelectedColorDisplayHeader>
                  Selected color is
                </SC_SelectedColorDisplayHeader>
                <SC_ModalTagItemContainer
                  $bgColor={tagColor}
                  $fgIsDark={isColorDark(tagColor)}
                >
                  <FaHashtag style={STYLE_ICON_MARGINS} />
                  {name}
                </SC_ModalTagItemContainer>
              </SC_SelectedColorDisplayContainer>
            </SC_TagColorPickerContainer>
          ) : (
            <></>
          )}
          {errorMessage !== "" ? (
            <SC_ErrorMessageHolder>
              <ErrorMessage
                errorMessage={errorMessage}
                isDismissable={true}
                show={errorMessage !== ""}
                setShow={(show: boolean) => {
                  if (!show) {
                    setErrorMessage("");
                  } else return;
                }}
              />
            </SC_ErrorMessageHolder>
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
  data,
}: AddButtonProp) => {
  const [showModal, setShowModal] = useState(false);

  const onClickToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <SC_ShowAddEditModalButton title={text} onClick={onClickToggleModal}>
        {mode === "CREATE" ? <AiFillPlusCircle /> : <MdEditSquare />}
        <SC_ToggleButtonText $isTextEmpty={text.length === 0}>
          {text}
        </SC_ToggleButtonText>
      </SC_ShowAddEditModalButton>
      {showModal && (
        <AddEditForm
          closeFn={onClickToggleModal}
          mode={mode}
          what={what}
          where={where}
          data={data}
        />
      )}
    </>
  );
};
