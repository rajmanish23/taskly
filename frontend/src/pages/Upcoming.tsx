// import SideBar from "../components/SideBar";
import MainView from "../components/MainView";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Upcoming = () => {
  useDocumentTitle("Upcoming");

  return (
    <MainView data={[]} selectedView="UPCOMING" isLoading={true} />
  );
};

export default Upcoming;
