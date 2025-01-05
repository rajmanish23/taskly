import { useState } from "react";
import { FaCheckCircle, FaHashtag } from "react-icons/fa";

import {
  SC_PositioningContainer,
  SC_ViewModeSelector,
  SC_ViewModeSelectorContainer,
} from "./styles";
import TasksListView from "../TasksListView";
import { STYLE_ICON_MARGINS } from "../../constants";

const RestoreDeletedView = () => {
  const [viewMode, setViewMode] = useState<"TASK" | "TAGS">("TASK");

  console.log(window.location.pathname);

  return (
    <SC_PositioningContainer>
      <SC_ViewModeSelectorContainer>
        <SC_ViewModeSelector
          onClick={() => setViewMode("TASK")}
          $selected={viewMode === "TASK"}
        >
          <FaCheckCircle style={STYLE_ICON_MARGINS} />
          Tasks
        </SC_ViewModeSelector>
        <SC_ViewModeSelector
          onClick={() => setViewMode("TAGS")}
          $selected={viewMode === "TAGS"}
        >
          <FaHashtag style={STYLE_ICON_MARGINS} />
          Tags
        </SC_ViewModeSelector>
      </SC_ViewModeSelectorContainer>
      {viewMode === "TASK" ? <TasksListView mode="RESTORE" /> : <div>Tags</div>}
    </SC_PositioningContainer>
  );
};

export default RestoreDeletedView;
