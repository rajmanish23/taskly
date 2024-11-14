import SideBar from "../components/SideBar";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Today = () => {
  useDocumentTitle("Today");

  return (
    <>
      <div>Today</div>
      <SideBar mode="NORMAL" />
    </>
);
};

export default Today;
