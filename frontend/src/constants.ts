export const ACCESS_KEY = "access";
export const REFRESH_KEY = "refresh";
export const LOCAL_TAGS_KEY = "tag-data";
export const LOCAL_USER_KEY = "user-data";

export const STYLE_TEXT_COLOR = "#ec8e8e";
export const STYLE_BUTTON_HIGHLIGHT_COLOR = "#854a4a";
export const STYLE_NON_BUTTON_HOVER_HIGHLIGHT_COLOR = "#363333";
export const STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR = "#5e5555";
export const STYLE_BORDER_COLOR = "#787070";
export const STYLE_CARD_BACKGROUND_COLOR = "#2c2929";
export const STYLE_TRANSITION_TIME = "0.15s";
export const STYLE_ICON_MARGINS = {
  marginRight: 5,
};
export const BAR_LOADER_HEIGHT = 3;
export const BAR_LOADER_WIDTH = 150;

export const DEVICE_WIDTH = {
  MOBILE: "(max-width: 767px)",
  PC: "(min-width: 767px)",
};

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const LOGIN_API_URL = "/api/token/";
export const TOKEN_REFRESH_API_URL = "/api/token/refresh/";
export const REGISTER_API_URL = "/api/user/register/";
export const GET_TAGS_LIST_API_URL = (tagId: string) => `/api/tags/${tagId}/`;
export const GET_TODAY_LIST_API_URL = "/api/tasks/today/";
export const GET_UPCOMING_LIST_API_URL = "/api/tasks/upcoming/";
export const GET_PREVIOUS_LIST_API_URL = "/api/tasks/previous/";
export const GET_USER_API_URL = "/api/user/get/";

export const LOGIN_PAGE_URL = "/login";
export const REGISTER_PAGE_URL = "/register";
export const TODAY_PAGE_URL = "/";
export const PREVIOUS_PAGE_URL = "/previous";
export const UPCOMING_PAGE_URL = "/upcoming";
export const TAG_PAGE_URL_WITH_PARAM = "/tag/:tagId";
export const TAG_PAGE_URL_NO_PARAM = "/tag/";
