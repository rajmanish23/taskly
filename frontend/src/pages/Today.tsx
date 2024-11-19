// import SideBar from "../components/SideBar";
import { useCallback, useEffect, useState } from "react";
import { getTodayTasksAPI } from "../API/tasksAPI";
import TasksListView from "../components/TasksListView";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { isAPIErrorMessage } from "../utils/objectTypeCheckers";

const Today = () => {
  useDocumentTitle("Today");

  const [tasks, setTasks] = useState<Task[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTodayTasksAPI();
      if (isAPIErrorMessage(data)) {
        setTasks([])
        console.log(data.detail)
      } else {
        setTasks(data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTasks().catch((e) => console.log(e));
  }, [getTasks]);

  return (
    <>
      <div>Today</div>
      {/* <SideBar mode="NORMAL" /> */}
      <TasksListView mode="TODAY"/>
    </>
);
};

export default Today;
