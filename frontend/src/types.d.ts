type SubTaskAPIData = {
  s_id: string;
  name: string;
  due_at: string;
  completed_at: string;
};

type APIStatusMessage = {
  detail: string;
  isError: boolean;
  sId?: string;
};

type TaskAPIData = {
  s_id: string;
  name: string;
  description: string;
  due_at: string;
  sub_tasks: SubTaskAPIData[];
  tags: TagAPIData[];
  deleted_at: string;
  completed_at: string;
};

type TagAPIData = {
  s_id: string;
  name: string;
  color_hex: string;
  task_set: TaskAPIData[];
  deleted_at: string;
};

type Tag = {
  sId: string;
  name: string;
  colorHex: string;
  deletedAt?: Date | null;
};

type TagAPIConvertedData = {
  sId: string;
  name: string;
  colorHex: string;
  taskSet: Task[];
};

type SubTask = {
  sId: string;
  name: string;
  dueAt: Date | null;
  completedAt: Date | null;
};

type Task = {
  sId: string;
  name: string;
  description: string;
  dueAt: Date;
  subTasks: SubTask[];
  tags: Tag[];
  deletedAt: Date | null;
  completedAt: Date | null;
};

type User = {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

type SelectedView =
  | "TODAY"
  | "UPCOMING"
  | "PREVIOUS"
  | "COMPLETED"
  | "DELETED"
  | "TAG"
  | "TASK"
  | "SETTINGS"
  | "PROFILE"
  | "RESTORE"
  | "NAME_EDIT"
  | "EMAIL_EDIT"
  | "PASS_EDIT"
  | "LOGOUT"
  | "DEL_ACC";

type DataState = {
  sId: string;
  name: string;
  description?: string;
  dueAt?: Date | null;
  colorHex?: string;
};
