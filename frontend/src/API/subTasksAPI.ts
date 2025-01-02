import baseTokenfulAPI from "./baseAPI";
import { CREATE_SUB_TASK_API_URL, SUB_TASK_SINGLE_ITEM_API_URL } from "../constants";
import { isAxiosError } from "axios";
import { handleError } from "./utils";

export const permanentlyDeleteSubTask = async (taskId: string) => {
  try {
    await baseTokenfulAPI.delete(SUB_TASK_SINGLE_ITEM_API_URL(taskId));
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

type CreateSubTaskData = {
  name: string;
  dueAt?: Date;
};

export const createSubTask = async (parentTaskId: string, {
  name,
  dueAt,
}: CreateSubTaskData): Promise<APIStatusMessage> => {
  try {
    await baseTokenfulAPI.post(CREATE_SUB_TASK_API_URL(parentTaskId), {
      name,
      dueAt: dueAt?.toISOString(),
    });
    return { detail: "Sub Task created successfully", isError: false };
  } catch (error) {
    return handleError(error);
  }
};

type UpdateSubTaskData = {
  name?: string;
  dueAt?: Date;
};

export const updateSubTask = async (
  subTaskId: string,
  { name, dueAt }: UpdateSubTaskData
): Promise<APIStatusMessage> => {
  try {
    await baseTokenfulAPI.put(SUB_TASK_SINGLE_ITEM_API_URL(subTaskId), {
      name,
      dueAt: dueAt?.toISOString(),
    });
    return { detail: "Sub Task updated successfully", isError: false };
  } catch (error) {
    return handleError(error);
  }
};