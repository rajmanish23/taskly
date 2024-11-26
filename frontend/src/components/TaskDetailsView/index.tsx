type Props = {
  taskId?: string;
};

const TaskDetailsView = ({ taskId }: Props) => {
  return <div>{taskId}</div>;
};

export default TaskDetailsView;
