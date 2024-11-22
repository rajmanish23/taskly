import { useCallback, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

import TaskDisplayCard from "../TaskDisplayCard";
import {
  SC_BackgroundListContainer,
  SC_CentralNoDataContainer,
  SC_EmptyDisplayHeader,
  SC_HeaderContainer,
  SC_HeaderTextContainer,
  SC_TaskListContainer,
  SC_TopHeader1,
  SC_TopHeader2,
} from "./styles";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_TEXT_COLOR,
} from "../../constants";
import { AddButton } from "../AddButton";
import {
  getPreviousTasksAPI,
  getTagTasksAPI,
  getTodayTasksAPI,
  getUpcomingTasksAPI,
} from "../../API/tasksAPI";
import {
  isAPIErrorMessage,
  isTagAPIConvertedData,
} from "../../utils/objectTypeCheckers";

type TaskListViewProps = {
  mode: SelectedView;
  tagId?: string;
};

const TasksListView = ({ mode, tagId }: TaskListViewProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tag, setTag] = useState<Tag>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      let data: Task[] | TagAPIConvertedData | APIErrorMessage;
      if (mode === "TODAY") {
        data = await getTodayTasksAPI();
      } else if (mode === "UPCOMING") {
        data = await getUpcomingTasksAPI();
      } else if (mode === "PREVIOUS") {
        data = await getPreviousTasksAPI();
      } else if (mode === "TAG") {
        if (tagId === undefined) throw Error("Tag ID not passed!");
        data = await getTagTasksAPI(tagId);
      } else {
        throw Error("Settings View is used for Task listing component!");
      }
      if (isAPIErrorMessage(data)) {
        setTasks([]);
        console.log(data.detail);
      } else if (isTagAPIConvertedData(data)) {
        setTasks(data.taskSet);
        setTag({
          name: data.name,
          colorHex: data.colorHex,
          sId: data.sId,
        });
      } else {
        setTasks(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [mode, tagId]);

  useEffect(() => {
    getTasks().catch((e) => console.log(e));
  }, [getTasks]);

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
          <SC_HeaderTextContainer>
            <SC_TopHeader1>Today</SC_TopHeader1>
            <SC_TopHeader2>{`(${now.toLocaleDateString(undefined, {
              dateStyle: "full",
            })})`}</SC_TopHeader2>
          </SC_HeaderTextContainer>
        );
      case "UPCOMING":
        return (
          <SC_HeaderTextContainer>
            <SC_TopHeader1>Upcoming</SC_TopHeader1>
          </SC_HeaderTextContainer>
        );
      case "TAG":
        return (
          <SC_HeaderTextContainer>
            <SC_TopHeader1>{tag?.name}</SC_TopHeader1>
          </SC_HeaderTextContainer>
        );
      case "PREVIOUS":
        return (
          <SC_HeaderTextContainer>
            <SC_TopHeader1>Previous</SC_TopHeader1>
          </SC_HeaderTextContainer>
        );
    }
  };

  return (
    <SC_BackgroundListContainer>
      <SC_HeaderContainer>
        {getListViewHeading()}
        <AddButton text="Create a new Task" />
      </SC_HeaderContainer>
      {isLoading ? (
        <SC_CentralNoDataContainer>
          <BarLoader
            color={STYLE_TEXT_COLOR}
            height={BAR_LOADER_HEIGHT}
            width={BAR_LOADER_WIDTH}
          />
        </SC_CentralNoDataContainer>
      ) : tasks.length === 0 ? (
        <SC_CentralNoDataContainer>
          <SC_EmptyDisplayHeader>{getEmptyDisplayText()}</SC_EmptyDisplayHeader>
          <AddButton text="Create a new Task" />
        </SC_CentralNoDataContainer>
      ) : (
        <SC_TaskListContainer>
          {tasks?.map((each) => (
            <TaskDisplayCard key={each.sId} data={each} />
          ))}
        </SC_TaskListContainer>
      )}
    </SC_BackgroundListContainer>
  );
};

export default TasksListView;
