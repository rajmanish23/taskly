import SideBar from "../SideBar";
import TasksListView from "../TasksListView";
import { SC_MainViewContainer } from "./styles";

type MainViewPropType = {
  isLoading: boolean;
  data: Task[];
};

export default function MainView ({isLoading, data}: MainViewPropType) {
  return (
    <SC_MainViewContainer>
      <SideBar mode="NORMAL" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TasksListView mode="TODAY" data={data} />
      )}
    </SC_MainViewContainer>
  );
}