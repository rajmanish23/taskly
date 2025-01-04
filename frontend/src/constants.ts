export const ACCESS_KEY = "access";
export const REFRESH_KEY = "refresh";
export const LOCAL_TAGS_KEY = "tag-data";
export const LOCAL_USER_KEY = "user-data";

// Styling constants
export const STYLE_TEXT_COLOR = "#f3adad";
export const STYLE_BUTTON_HIGHLIGHT_COLOR = "#854a4a";
export const STYLE_NON_BUTTON_HOVER_HIGHLIGHT_COLOR = "#363333";
export const STYLE_BUTTON_HOVER_HIGHLIGHT_COLOR = "#5e5555";
export const STYLE_ACTIVE_BUTTON_HOVER_HIGHLIGHT_COLOR = "#ab5f5f";
export const STYLE_BORDER_COLOR = "#787070";
export const STYLE_CARD_BACKGROUND_COLOR = "#2c2929";
export const STYLE_TRANSITION_TIME = "0.15s";
export const STYLE_ICON_MARGINS = {
  marginRight: 8,
};
export const BAR_LOADER_HEIGHT = 3;
export const BAR_LOADER_WIDTH = 150;
export const DEVICE_WIDTH = {
  MOBILE: "(max-width: 767px)",
  PC: "(min-width: 767px)",
};

// Login and Register APIs
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const LOGIN_API_URL = "/api/token/";
export const TOKEN_REFRESH_API_URL = "/api/token/refresh/";
export const REGISTER_API_URL = "/api/user/register/";

// User APIs
export const USER_API_URL = "/api/user/get/";
export const USER_DELETE_API = "/api/user/delete/";
export const UPDATE_NAME_API = "/api/user/update-name/";
export const UPDATE_EMAIL_API = "/api/user/update-email/";
export const UPDATE_PASSWORD_API = "/api/user/change-password/";

// Tag APIs
export const TAGS_LIST_CREATE_API_URL = "/api/tags/";
export const TAG_SINGLE_ITEM_API_URL = (tagId: string) => `/api/tags/${tagId}/`;
export const TAG_MARK_DELETE = (tagId: string) =>
  `/api/tags/${tagId}/mark-delete/`;
export const TAG_DELETE_RESTORE = (tagId: string) =>
  `/api/tags/${tagId}/delete-restore/`;

// Task APIs
export const TASK_SINGLE_ITEM_API_URL = (taskId: string) =>
  `/api/tasks/${taskId}/`;
export const TASK_MARK_DELETE = (taskId: string) =>
  `/api/tasks/${taskId}/mark-delete/`;
export const TASK_DELETE_RESTORE = (taskId: string) =>
  `/api/tasks/${taskId}/delete-restore/`;
export const TASK_MARK_COMPLETE = (taskId: string) =>
  `/api/tasks/${taskId}/mark-complete/`;
export const TASK_UNMARK_COMPLETE = (taskId: string) =>
  `/api/tasks/${taskId}/unmark-complete/`;
export const TASK_ADD_TAG = (taskId: string) => `/api/tasks/${taskId}/add-tag/`;
export const CREATE_TASK_API_URL = "/api/tasks/";
export const TODAY_TASKS_LIST_API_URL = "/api/tasks/today/";
export const UPCOMING_TASKS_LIST_API_URL = "/api/tasks/upcoming/";
export const PREVIOUS_TASKS_LIST_API_URL = "/api/tasks/previous/";
export const COMPLETED_TASKS_LIST_API_URL = "/api/tasks/completed/";

// Sub Task APIs
export const SUB_TASK_SINGLE_ITEM_API_URL = (subTaskId: string) =>
  `/api/sub-tasks/${subTaskId}/`;
export const SUB_TASK_MARK_COMPLETE = (subTaskId: string) =>
  `/api/sub-tasks/${subTaskId}/mark-complete/`;
export const SUB_TASK_UNMARK_COMPLETE = (subTaskId: string) =>
  `/api/sub-tasks/${subTaskId}/unmark-complete/`;
export const CREATE_SUB_TASK_API_URL = (parentTaskId: string) =>
  `/api/tasks/${parentTaskId}/sub-tasks/`;

// Frontend URLs
export const LOGIN_PAGE_URL = "/login";
export const REGISTER_PAGE_URL = "/register";
export const TODAY_PAGE_URL = "/";
export const PREVIOUS_PAGE_URL = "/previous";
export const UPCOMING_PAGE_URL = "/upcoming";
export const COMPLETED_PAGE_URL = "/completed";
export const TAG_PAGE_URL_WITH_PARAM = "/tag/:tagId";
export const TAG_PAGE_URL_NO_PARAM = "/tag/";
export const TASK_PAGE_URL_WITH_PARAM = "/task/:taskId";
export const TASK_PAGE_URL_NO_PARAM = "/task/";
export const SETTING_PROFILE_URL = "/settings/profile";
export const SETTING_CHANGE_PASSWORD_URL = "/settings/change-password";
export const SETTING_DELETE_ACCOUNT_URL = "/settings/delete-account";
export const SETTING_EDIT_EMAIL_URL = "/settings/edit-email";
export const SETTING_EDIT_NAME_URL = "/settings/edit-name";
export const SETTING_LOGOUT_URL = "/settings/logout";
export const SETTING_RESTORE_URL = "/settings/restore";

// Input constants
export const DELETE_CHALLENGE_TEXT = "I want to permanently delete my account";
export const TAG_NAME_CHAR_LIMIT = 20;
export const TASK_NAME_CHAR_LIMIT = 100;
export const SUB_TASK_CHAR_LIMIT = 100;
