import { useCallback, useEffect, useState } from "react";

import useDocumentTitle from "../hooks/useDocumentTitle";
import MainView from "../components/MainView";
import { getTodayTasksAPI } from "../API/tasksAPI";
import { isAPIErrorMessage } from "../utils/objectTypeCheckers";

const Today = () => {
  useDocumentTitle("Today");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTodayTasksAPI();
      if (isAPIErrorMessage(data)) {
        setTasks([]);
        console.log(data.detail);
      } else {
        setTasks(data);
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

  return <MainView data={tasks} isLoading={isLoading} />
};

export default Today;
