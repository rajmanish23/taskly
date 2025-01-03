import { useContext } from "react";
import { UpdateContext, UpdateContextType } from "../context/UpdateContext";
import { markCompleteTask, unmarkCompleteTask } from "../API/tasksAPI";
import { markCompleteSubTask, unmarkCompleteSubTask } from "../API/subTasksAPI";

export default function useToggleComplete() {
  const { triggerUpdate } = useContext(UpdateContext) as UpdateContextType;

  const toggleComplete = async (
    id: string,
    isCompleted: boolean,
    type: "TASK" | "SUB_TASK"
  ) => {
    try {
      let res;
      if (type === "TASK") {
        if (isCompleted) {
          res = await unmarkCompleteTask(id);
        } else {
          res = await markCompleteTask(id);
        }
        if (res.isError) {
          // TODO: Show toast for error here.
          console.log(res.detail);
          return;
        }
      } else {
        if (isCompleted) {
          res = await unmarkCompleteSubTask(id);
        } else { 
          res = await markCompleteSubTask(id);
        }
        if (res.isError) {
          // TODO: Show toast for error here.
          console.log(res.detail);
          return;
        }
      }
      triggerUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return toggleComplete;
}
