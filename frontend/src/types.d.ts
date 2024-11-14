type SubTaskAPIData = {
  s_id: string;
  name: string;
  due_at: string;
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