import SideBar from "../SideBar";
import TasksListView from "../TasksListView";
import { SC_MainViewContainer } from "./styles";

type MainViewPropType = {
  isLoading: boolean;
  data: Task[];
  selectedView: SelectedView;
  selectedTag?: string;
};

export default function MainView({
  isLoading,
  data,
  selectedView,
  selectedTag,
}: MainViewPropType) {
  return (
    <SC_MainViewContainer>
      <SideBar
        mode="NORMAL"
        selectedView={selectedView}
        selectedTag={selectedTag}
      />
      <TasksListView mode={selectedView} data={data} isLoading={isLoading} />
    </SC_MainViewContainer>
  );
}
