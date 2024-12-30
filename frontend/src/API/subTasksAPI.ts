import baseTokenfulAPI from "./baseAPI";
import { SUB_TASK_SINGLE_ITEM_API_URL } from "../constants";
import { isAxiosError } from "axios";

export const permanentlyDeleteSubTask = async (
  taskId: string,
  subTaskId: string
) => {
  try {
    await baseTokenfulAPI.delete(
      SUB_TASK_SINGLE_ITEM_API_URL(taskId, subTaskId)
    );
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};
