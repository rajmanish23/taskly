import { useState } from "react";

import { SC_PositioningContainer, SC_ViewModeSelector, SC_ViewModeSelectorContainer } from "./styles";
import TasksListView from "../TasksListView";

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
          Tasks
        </SC_ViewModeSelector>
        <SC_ViewModeSelector
          onClick={() => setViewMode("TAGS")}
          $selected={viewMode === "TAGS"}
        >
          Tags
        </SC_ViewModeSelector>
      </SC_ViewModeSelectorContainer>
      {viewMode === "TASK" ? <TasksListView mode="RESTORE" /> : <div>Tags</div>}
    </SC_PositioningContainer>
  );
};

export default RestoreDeletedView;
