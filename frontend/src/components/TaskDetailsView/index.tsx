import { useCallback, useEffect, useState } from "react";
import {
  SC_BackgroundContainer,
  SC_CentralNoDataContainer,
} from "../commonStyles";
import ViewHeader from "../ViewHeader";
import { BarLoader } from "react-spinners";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_TEXT_COLOR,
} from "../../constants";
import { getTaskDetailsAPI } from "../../API/tasksAPI";
import { isAPIErrorMessage } from "../../utils/objectTypeCheckers";
import ErrorMessage from "../ErrorMessage";

type Props = {
  taskId?: string;
};

const TaskDetailsView = ({ taskId }: Props) => {
  const [taskData, setTaskData] = useState<Task>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTaskData = useCallback(async () => {
    setIsLoading(true);
    if (taskId === undefined)
      throw Error("!! Need to pass task ID to this component !!");
    try {
      const data = await getTaskDetailsAPI(taskId);
      if (isAPIErrorMessage(data)) {
        setErrorMessage(data.detail);
      } else {
        setTaskData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    getTaskData().catch((e) => {
      console.error(e);
      setIsLoading(false);
    });
  }, [getTaskData]);

  return (
    <SC_BackgroundContainer>
      <ViewHeader h1Text="Viewing Task" editButtonText="Edit Task" />
      {isLoading ? (
        <SC_CentralNoDataContainer>
          <BarLoader
            height={BAR_LOADER_HEIGHT}
            width={BAR_LOADER_WIDTH}
            color={STYLE_TEXT_COLOR}
          />
        </SC_CentralNoDataContainer>
      ) : errorMessage !== "" ? (
        <SC_CentralNoDataContainer>
          <ErrorMessage errorMessage={errorMessage} />
        </SC_CentralNoDataContainer>
      ) : (
        <></>
      )}
    </SC_BackgroundContainer>
  );
};

export default TaskDetailsView;
