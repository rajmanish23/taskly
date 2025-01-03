import baseTokenfulAPI from "./baseAPI";
import {
  PREVIOUS_TASKS_LIST_API_URL,
  TAG_SINGLE_ITEM_API_URL,
  TASK_DELETE_RESTORE,
  TASK_SINGLE_ITEM_API_URL,
  TASK_MARK_DELETE,
  TODAY_TASKS_LIST_API_URL,
  UPCOMING_TASKS_LIST_API_URL,
  CREATE_TASK_API_URL,
  TASK_MARK_COMPLETE,
  TASK_UNMARK_COMPLETE,
} from "../constants";
import { isAxiosError } from "axios";
import { handleError } from "./utils";

const convertTaskAPIData = (data: TaskAPIData) => {
  const apiTasksData: Task = {
    sId: data.s_id,
    name: data.name,
    description: data.description,
    dueAt: new Date(data.due_at),
    subTasks: data.sub_tasks.map((eachSubTask: SubTaskAPIData) => ({
      dueAt: eachSubTask.due_at === null ? null : new Date(eachSubTask.due_at),
      name: eachSubTask.name,
      sId: eachSubTask.s_id,
      completedAt:
        eachSubTask.completed_at === null
          ? null
          : new Date(eachSubTask.completed_at),
    })),
    tags: data.tags.map((eachTag: TagAPIData) => ({
      colorHex: eachTag.color_hex,
      name: eachTag.name,
      sId: eachTag.s_id,
    })),
    completedAt:
      data.completed_at === null ? null : new Date(data.completed_at),
    deletedAt: data.deleted_at === null ? null : new Date(data.deleted_at),
  };
  return apiTasksData;
};

type GetTaskResponse = TaskAPIData[];

export const getTodayTasksAPI = async (): Promise<
  Task[] | APIStatusMessage
> => {
  try {
    const now = new Date();
    const { data } = await baseTokenfulAPI.get<GetTaskResponse>(
      TODAY_TASKS_LIST_API_URL,
      { params: { date: now.toISOString().slice(0, 10) } }
    );
    return data.map((each) => convertTaskAPIData(each));
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      const err: APIStatusMessage = {
        detail: error.response.data.detail,
        isError: true,
      };
      return err;
    }
    throw error;
  }
};

export const getPreviousTasksAPI = async (): Promise<
  Task[] | APIStatusMessage
> => {
  try {
    const now = new Date();
    const { data } = await baseTokenfulAPI.get<GetTaskResponse>(
      PREVIOUS_TASKS_LIST_API_URL,
      { params: { date: now.toISOString().slice(0, 10) } }
    );
    return data.map((each) => convertTaskAPIData(each));
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      const err: APIStatusMessage = {
        detail: error.response.data.detail,
        isError: true,
      };
      return err;
    }
    throw error;
  }
};

export const getUpcomingTasksAPI = async (): Promise<
  Task[] | APIStatusMessage
> => {
  try {
    const now = new Date();
    const { data } = await baseTokenfulAPI.get<GetTaskResponse>(
      UPCOMING_TASKS_LIST_API_URL,
      { params: { date: now.toISOString().slice(0, 10) } }
    );
    return data.map((each) => convertTaskAPIData(each));
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      const err: APIStatusMessage = {
        detail: error.response.data.detail,
        isError: true,
      };
      return err;
    }
    throw error;
  }
};

type GetTagTasksResponse = TagAPIData;

const convertTagTasksAPIData = (data: TagAPIData) => {
  const newData: TagAPIConvertedData = {
    sId: data.s_id,
    name: data.name,
    colorHex: data.color_hex,
    taskSet: data.task_set.map((each) => convertTaskAPIData(each)),
  };
  return newData;
};

export const getTagTasksAPI = async (
  tagId: string
): Promise<TagAPIConvertedData | APIStatusMessage> => {
  try {
    const { data } = await baseTokenfulAPI.get<GetTagTasksResponse>(
      TAG_SINGLE_ITEM_API_URL(tagId)
    );
    return convertTagTasksAPIData(data);
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      const err: APIStatusMessage = {
        detail: error.response.data.detail,
        isError: true,
      };
      return err;
    }
    throw error;
  }
};

type GetTaskDetailResponse = TaskAPIData;

export const getTaskDetailsAPI = async (
  taskId: string
): Promise<Task | APIStatusMessage> => {
  try {
    const { data } = await baseTokenfulAPI.get<GetTaskDetailResponse>(
      TASK_SINGLE_ITEM_API_URL(taskId)
    );
    return convertTaskAPIData(data);
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      const err: APIStatusMessage = {
        detail: error.response.data.detail,
        isError: true,
      };
      return err;
    }
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await baseTokenfulAPI.delete(TASK_MARK_DELETE(taskId));
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

export const permanentlyDeleteTask = async (taskId: string) => {
  try {
    await baseTokenfulAPI.delete(TASK_SINGLE_ITEM_API_URL(taskId));
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

export const restoreTask = async (taskId: string) => {
  try {
    await baseTokenfulAPI.put(TASK_DELETE_RESTORE(taskId));
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

type CreateTaskData = {
  name: string;
  description?: string;
  dueAt: Date;
};

export const createTask = async ({
  name,
  description,
  dueAt,
}: CreateTaskData): Promise<APIStatusMessage> => {
  try {
    const res = await baseTokenfulAPI.post(CREATE_TASK_API_URL, {
      name,
      description,
      dueAt: dueAt.toISOString(),
    });
    return {
      detail: "Task created successfully",
      isError: false,
      sId: res.data.s_id,
    };
  } catch (error) {
    return handleError(error);
  }
};

type UpdateTaskData = {
  name?: string;
  description?: string;
  dueAt?: Date;
};

export const updateTask = async (
  id: string,
  { name, description, dueAt }: UpdateTaskData
): Promise<APIStatusMessage> => {
  try {
    await baseTokenfulAPI.put(TASK_SINGLE_ITEM_API_URL(id), {
      name,
      description,
      dueAt: dueAt?.toISOString(),
    });
    return { detail: "Task updated successfully", isError: false };
  } catch (error) {
    return handleError(error);
  }
};

export const markCompleteTask = async (
  taskId: string
): Promise<APIStatusMessage> => {
  try {
    await baseTokenfulAPI.put(TASK_MARK_COMPLETE(taskId));
    return { detail: "Task marked as completed", isError: false };
  } catch (error) {
    return handleError(error);
  }
};

export const unmarkCompleteTask = async (
  taskId: string
): Promise<APIStatusMessage> => {
  try {
    await baseTokenfulAPI.put(TASK_UNMARK_COMPLETE(taskId));
    return { detail: "Task unmarked as completed", isError: false };
  } catch (error) {
    return handleError(error);
  }
};
