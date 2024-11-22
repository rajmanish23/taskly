import baseAPI from "./baseAPI";
import {
  GET_PREVIOUS_LIST_API_URL,
  GET_TAGS_LIST_API_URL,
  GET_TODAY_LIST_API_URL,
  GET_UPCOMING_LIST_API_URL,
} from "../constants";
import { isAxiosError } from "axios";

const convertTaskAPIData = (data: TaskAPIData[]) => {
  const apiTasksData: Task[] = data.map((each: TaskAPIData) => {
    const newTag: Task = {
      sId: each.s_id,
      name: each.name,
      description: each.description,
      dueAt: new Date(each.due_at),
      subTasks: each.sub_tasks.map((eachSubTask: SubTaskAPIData) => ({
        dueAt:
          eachSubTask.due_at === null ? null : new Date(eachSubTask.due_at),
        name: eachSubTask.name,
        sId: eachSubTask.s_id,
      })),
      tags: each.tags.map((eachTag: TagAPIData) => ({
        colorHex: eachTag.color_hex,
        name: eachTag.name,
        sId: eachTag.s_id,
      })),
    };
    return newTag;
  });
  return apiTasksData;
};

type GetTaskResponse = TaskAPIData[];

export const getTodayTasksAPI = async (): Promise<Task[] | APIErrorMessage> => {
  try {
    const now = new Date();
    const { data } = await baseAPI.get<GetTaskResponse>(
      GET_TODAY_LIST_API_URL,
      { params: { date: now.toISOString().slice(0, 10) } }
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

export const getPreviousTasksAPI = async (): Promise<
  Task[] | APIErrorMessage
> => {
  try {
    const now = new Date();
    const { data } = await baseAPI.get<GetTaskResponse>(
      GET_PREVIOUS_LIST_API_URL,
      { params: { date: now.toISOString().slice(0, 10) } }
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

export const getUpcomingTasksAPI = async (): Promise<
  Task[] | APIErrorMessage
> => {
  try {
    const now = new Date();
    const { data } = await baseAPI.get<GetTaskResponse>(
      GET_UPCOMING_LIST_API_URL,
      { params: { date: now.toISOString().slice(0, 10) } }
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

type GetTagTasksResponse = TagAPIData;

const convertTagTasksAPIData = (data: TagAPIData) => {
  const newData: TagAPIConvertedData = {
    sId: data.s_id,
    name: data.name,
    colorHex: data.color_hex,
    taskSet: convertTaskAPIData(data.task_set)
  }
  return newData
};

export const getTagTasksAPI = async (
  tagId: string
): Promise<TagAPIConvertedData | APIErrorMessage> => {
  try {
    const { data } = await baseAPI.get<GetTagTasksResponse>(
      GET_TAGS_LIST_API_URL(tagId)
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
