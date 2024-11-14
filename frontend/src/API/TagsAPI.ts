import api from "../api";
import { GET_TAGS_LIST_API_URL, LOCAL_TAGS_KEY } from "../constants";

export const getTagsAPI = async (): Promise<Tag[]> => {
  const localTagsData = localStorage.getItem(LOCAL_TAGS_KEY);
  if (localTagsData !== null) {
    return JSON.parse(localTagsData);
  }
  const res = await api.get(GET_TAGS_LIST_API_URL);
  const apiTagsData: Tag[] = res.data.map((each: TagAPIData) => {
    const newTag: Tag = {
      sId: each.s_id,
      colorHex: each.color_hex,
      name: each.name,
    };
    return newTag;
  });
  localStorage.setItem(LOCAL_TAGS_KEY, JSON.stringify(apiTagsData));
  return apiTagsData;
}