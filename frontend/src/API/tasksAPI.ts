import baseTokenfulAPI from "./baseAPI";
import {
  PREVIOUS_TASKS_LIST_API_URL,
  TAGS_TASK_LIST_API_URL,
  TASK_DETAILS_API_URL,
  TODAY_TASKS_LIST_API_URL,
  UPCOMING_TASKS_LIST_API_URL,
} from "../constants";
import { isAxiosError } from "axios";

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

export const getTodayTasksAPI = async (): Promise<Task[] | APIErrorMessage> => {
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
      const err: APIErrorMessage = {
        detail: error.response.data.detail,
      };
      return err;
    }
    throw error;
  }
};

export const getPreviousTasksAPI = async (): Promise<
  Task[] | APIErrorMessage
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
      const err: APIErrorMessage = {
        detail: error.response.data.detail,
      };
      return err;
    }
    throw error;
  }
};

export const getUpcomingTasksAPI = async (): Promise<
  Task[] | APIErrorMessage
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
      const err: APIErrorMessage = {
        detail: error.response.data.detail,
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
): Promise<TagAPIConvertedData | APIErrorMessage> => {
  try {
    const { data } = await baseTokenfulAPI.get<GetTagTasksResponse>(
      TAGS_TASK_LIST_API_URL(tagId)
    );
    return convertTagTasksAPIData(data);
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      const err: APIErrorMessage = {
        detail: error.response.data.detail,
      };
      return err;
    }
    throw error;
  }
};

type GetTaskDetailResponse = TaskAPIData;

export const getTaskDetailsAPI = async (
  taskId: string
): Promise<Task | APIErrorMessage> => {
  try {
    const { data } = await baseTokenfulAPI.get<GetTaskDetailResponse>(
      TASK_DETAILS_API_URL(taskId)
    );
    return convertTaskAPIData(data);
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      const err: APIErrorMessage = {
        detail: error.response.data.detail,
      };
      return err;
    }
    throw error;
  }
};
