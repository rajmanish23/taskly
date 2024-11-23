type SubTaskAPIData = {
  s_id: string;
  name: string;
  due_at: string;
};

type APIErrorMessage = {
  detail: string;
};

type TaskAPIData = {
  s_id: string;
  name: string;
  description: string;
  due_at: string;
  sub_tasks: SubTaskAPIData[];
  tags: TagAPIData[];
};

type TagAPIData = {
  s_id: string;
  name: string;
  color_hex: string;
  task_set: TaskAPIData[];
};

type Tag = {
  sId: string;
  name: string;
  colorHex: string;
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
};

type Task = {
  sId: string;
  name: string;
  description: string;
  dueAt: Date;
  subTasks: SubTask[];
  tags: Tag[];
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
  | "TAG"
  | "TASK"
  | "PROFILE"
  | "NAME_EDIT"
  | "EMAIL_EDIT"
  | "PASS_EDIT"
  | "LOGOUT"
  | "DEL_ACC";
