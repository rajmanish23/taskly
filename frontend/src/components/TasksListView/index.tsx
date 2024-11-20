import TaskDisplayCard from "../TaskDisplayCard";

type TaskListViewProps = {
  mode: "TODAY" | "UPCOMING" | "PREVIOUS" | "TAG";
  data: Task[];
};

const TasksListView = ({ mode, data }: TaskListViewProps) => {
  const getEmptyDisplayText = () => {
    switch (mode) {
      case "TODAY":
        return "No tasks to complete today! Enjoy a peaceful day!";
      case "UPCOMING":
        return "You don't have any upcoming tasks! Enjoy a peaceful day!";
      case "PREVIOUS":
        return "You do not have any pending tasks! Enjoy a peaceful day!";
      case "TAG":
        return "There are no tasks in with this tag";
    }
  }

  const getListViewHeading = () => {
    const now = new Date();
    switch (mode) {
      case "TODAY":
        return (
          <div>
            <h1>Today</h1>
            <h2>{`(${now.toLocaleDateString(undefined, {
              dateStyle: "full",
            })})`}</h2>
          </div>
        );
      case "UPCOMING":
        return (
          <div>
            <h1>Upcoming</h1>
          </div>
        );
      case "TAG":
        return (
          <div>
            <h1>!! TEMP TAG HEADER !!</h1>
          </div>
        );
      case "PREVIOUS":
        return (
          <div>
            <h1>Previous</h1>
          </div>
        );
    }
  };

  return (
    <div>
      <div>
        {getListViewHeading()}
        <button>Create a new task +</button>
      </div>
      {data.length === 0 ? (
        <>
          <h1>{getEmptyDisplayText()}</h1>
          <button>Create a new task +</button>
        </>
      ) : (
        <ul>
          {data?.map((each) => (
            <TaskDisplayCard key={each.sId} data={each} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksListView;
