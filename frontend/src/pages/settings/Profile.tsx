import useDocumentTitle from "../../hooks/useDocumentTitle";
import SideBar from "../../components/SideBar";
import { SC_MainViewContainer } from "../styles";

const Profile = () => {
  useDocumentTitle("Profile");

  return (
    <SC_MainViewContainer>
      <SideBar mode="SETTINGS" selectedView="PROFILE" selectedTag="" />
    </SC_MainViewContainer>
  );
};

export default Profile;
