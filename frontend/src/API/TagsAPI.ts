import baseTokenfulAPI from "./baseAPI";
import { TAGS_LIST_API_URL, LOCAL_TAGS_KEY } from "../constants";

export const getTagsAPI = async (): Promise<Tag[]> => {
  const localTagsData = sessionStorage.getItem(LOCAL_TAGS_KEY);
  if (localTagsData !== null) {
    return JSON.parse(localTagsData);
  }
  const res = await baseTokenfulAPI.get(TAGS_LIST_API_URL);
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
