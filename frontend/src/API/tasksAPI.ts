import baseAPI from "./baseAPI";
import {
  GET_PREVIOUS_LIST_API_URL,
  GET_TODAY_LIST_API_URL,
  GET_UPCOMING_LIST_API_URL,
} from "../constants";
import { isAxiosError } from "axios";

const convertAPIData = (data: TaskAPIData[]) => {
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
    return convertAPIData(data);
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
    return convertAPIData(data);
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
    return convertAPIData(data);
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
