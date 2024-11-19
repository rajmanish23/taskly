export const ACCESS_KEY = "access";
export const REFRESH_KEY = "refresh";
export const LOCAL_TAGS_KEY = "tag-data";
export const LOCAL_USER_KEY = "user-data";

export const STYLE_TEXT_COLOR = "#ec8e8e";

export const DEVICE_WIDTH = {
  MOBILE: "(max-width: 767px)",
  PC: "(min-width: 768px)",
};

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const LOGIN_API_URL = "/api/token/";
export const TOKEN_REFRESH_API_URL = "/api/token/refresh/";
export const REGISTER_API_URL = "/api/user/register/";
export const GET_TAGS_LIST_API_URL = "/api/tags/";
export const GET_USER_API_URL = "/api/user/get/";

export const LOGIN_PAGE_URL = "/login";
export const REGISTER_PAGE_URL = "/register";
export const TODAY_PAGE_URL = "/";
export const UPCOMING_PAGE_URL = "/upcoming";
