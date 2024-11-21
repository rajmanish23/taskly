import { BarLoader } from "react-spinners";
import TaskDisplayCard from "../TaskDisplayCard";
import { SC_BackgroundListContainer } from "./styles";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_TEXT_COLOR,
} from "../../constants";

type TaskListViewProps = {
  mode: SelectedView;
  data: Task[];
  isLoading: boolean;
};

const TasksListView = ({ mode, data, isLoading }: TaskListViewProps) => {
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
  };

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
    <SC_BackgroundListContainer>
      <div>
        {getListViewHeading()}
        <button>Create a new task +</button>
      </div>
      {isLoading ? (
        <BarLoader
          color={STYLE_TEXT_COLOR}
          height={BAR_LOADER_HEIGHT}
          width={BAR_LOADER_WIDTH}
        />
      ) : data.length === 0 ? (
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
    </SC_BackgroundListContainer>
  );
};

export default TasksListView;
