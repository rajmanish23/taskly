import baseTokenfulAPI from "./baseAPI";
import {
  TAGS_LIST_CREATE_API_URL,
  LOCAL_TAGS_KEY,
  TAG_MARK_DELETE,
  TAG_SINGLE_ITEM_API_URL,
  TAG_DELETE_RESTORE,
} from "../constants";
import { isAxiosError } from "axios";
import { handleError } from "./utils";

const clearLocalTags = () => {
  sessionStorage.removeItem(LOCAL_TAGS_KEY);
};

export const getTagsAPI = async (): Promise<Tag[]> => {
  const localTagsData = sessionStorage.getItem(LOCAL_TAGS_KEY);
  if (localTagsData !== null) {
    return JSON.parse(localTagsData);
  }
  const res = await baseTokenfulAPI.get(TAGS_LIST_CREATE_API_URL);
  const apiTagsData: Tag[] = res.data.map((each: TagAPIData) => {
    const newTag: Tag = {
      sId: each.s_id,
      colorHex: each.color_hex,
      name: each.name,
    };
    return newTag;
  });
  sessionStorage.setItem(LOCAL_TAGS_KEY, JSON.stringify(apiTagsData));
  return apiTagsData;
};

export const deleteTag = async (taskId: string) => {
  try {
    await baseTokenfulAPI.delete(TAG_MARK_DELETE(taskId));
    clearLocalTags();
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

export const permanentlyDeleteTag = async (taskId: string) => {
  try {
    await baseTokenfulAPI.delete(TAG_SINGLE_ITEM_API_URL(taskId));
    clearLocalTags();
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

export const restoreTag = async (taskId: string) => {
  try {
    await baseTokenfulAPI.put(TAG_DELETE_RESTORE(taskId));
    clearLocalTags();
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (error.response === undefined) throw error;
    if (error.response.status === 404) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

type CreateTagData = {
  name: string;
  colorHex: string;
};

export const createTag = async ({
  name,
  colorHex,
}: CreateTagData): Promise<APIStatusMessage> => {
  try {
    const res = await baseTokenfulAPI.post(
      TAGS_LIST_CREATE_API_URL,
      {
        name,
        colorHex,
      }
    );
    clearLocalTags();
    return {
      detail: "Tag created successfully",
      isError: false,
      sId: res.data.s_id,
    };
  } catch (error) {
    return handleError(error);
  }
};

type UpdateSubTaskData = {
  name?: string;
  colorHex?: string;
};

export const updateTag = async (
  tagId: string,
  { name, colorHex }: UpdateSubTaskData
): Promise<APIStatusMessage> => {
  try {
    await baseTokenfulAPI.put(TAG_SINGLE_ITEM_API_URL(tagId), {
      name,
      colorHex,
    });
    clearLocalTags();
    return { detail: "Tag updated successfully", isError: false };
  } catch (error) {
    return handleError(error);
  }
};
