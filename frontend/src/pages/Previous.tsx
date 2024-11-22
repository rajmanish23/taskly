import { useCallback, useEffect, useState } from "react";

import useDocumentTitle from "../hooks/useDocumentTitle";
import MainView from "../components/MainView";
import { getPreviousTasksAPI } from "../API/tasksAPI";
import { isAPIErrorMessage } from "../utils/objectTypeCheckers";

const Previous = () => {
  useDocumentTitle("Previous");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPreviousTasksAPI();
      if (isAPIErrorMessage(data)) {
        setTasks([]);
        console.log(data.detail);
      } else {
        setTasks(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTasks().catch((e) => console.log(e));
  }, [getTasks]);

  return <MainView data={tasks} isLoading={isLoading} selectedView="PREVIOUS" />;
};

export default Previous;
