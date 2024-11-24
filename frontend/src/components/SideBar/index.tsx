import { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { FaHashtag } from "react-icons/fa6";
import { MdToday } from "react-icons/md";
import { PiRewindFill } from "react-icons/pi";
import { MdUpcoming } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoCaretBackCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import logoImg from "../../assets/taskly-logo-big.png";
import profileImg from "../../assets/default-profile.jpg";

import { getTagsAPI } from "../../API/tagsAPI";
import { getUserAPI } from "../../API/userAPI";
import {
  SC_ContentContainer,
  SC_ProfileContainer,
  SC_ProfileImage,
  SC_SidebarContainer,
  SC_LogoImage,
  SC_OptionsContainer,
  SC_OptionsHeader,
  SC_Button,
  SC_InfoContainer,
  SC_DeleteButton,
  SC_TagListContaier,
  SC_BackButtonContainer,
} from "./styles";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  PREVIOUS_PAGE_URL,
  SETTING_CHANGE_PASSWORD_URL,
  SETTING_DELETE_ACCOUNT_URL,
  SETTING_EDIT_EMAIL_URL,
  SETTING_EDIT_NAME_URL,
  SETTING_LOGOUT_URL,
  SETTING_PROFILE_URL,
  STYLE_ICON_MARGINS,
  STYLE_TEXT_COLOR,
  TAG_PAGE_URL_NO_PARAM,
  TODAY_PAGE_URL,
  UPCOMING_PAGE_URL,
} from "../../constants";
import { AddButton } from "../AddButton";
import { PageContext, PageContextType } from "../../context";

type SideBarProps = {
  mode: "SETTINGS" | "NORMAL";
  selectedView: SelectedView;
  selectedTag: string | undefined;
};

const SideBar = ({ mode, selectedView, selectedTag }: SideBarProps) => {
  const [tags, setTags] = useState<Tag[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const { previousPage, setPreviousPage } = useContext(
    PageContext
  ) as PageContextType;
  const location = useLocation();
  const navigate = useNavigate();

  const getTags = useCallback(async () => {
    const userData = await getUserAPI();
    setUserName(userData.fullName);
    if (mode === "SETTINGS") return;
    setIsLoading(true);
    try {
      const data = await getTagsAPI();
      setTags(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  const getSelectedTagId = () => {
    if (selectedView === "TAG" && selectedTag !== undefined) {
      return selectedTag;
    }
    return "";
  };

  const getSelectedNormalView = () => {
    if (mode === "NORMAL") {
      return selectedView;
    }
    return "";
  };

  const getSelectedSettingsView = () => {
    if (mode === "SETTINGS") {
      return selectedView;
    }
    return "";
  };

  const navigateToViewsPage = (page: SelectedView, tagId?: string) => {
    switch (page) {
      case "TODAY":
        navigate(TODAY_PAGE_URL);
        return;
      case "UPCOMING":
        navigate(UPCOMING_PAGE_URL);
        return;
      case "PREVIOUS":
        navigate(PREVIOUS_PAGE_URL);
        return;
      case "TAG":
        if (tagId === undefined)
          throw Error("Pass the tag ID for the side bar button function!");
        navigate(TAG_PAGE_URL_NO_PARAM + tagId);
        return;
      case "PROFILE":
        navigate(SETTING_PROFILE_URL);
        return;
      case "NAME_EDIT":
        navigate(SETTING_EDIT_NAME_URL);
        return;
      case "EMAIL_EDIT":
        navigate(SETTING_EDIT_EMAIL_URL);
        return;
      case "PASS_EDIT":
        navigate(SETTING_CHANGE_PASSWORD_URL);
        return;
      case "LOGOUT":
        navigate(SETTING_LOGOUT_URL);
        return;
      case "DEL_ACC":
        navigate(SETTING_DELETE_ACCOUNT_URL);
        return;
    }
  };

  useEffect(() => {
    getTags().catch((e) => console.log(e));
  }, [getTags]);

  useEffect(() => {
    if (mode !== "SETTINGS") {
      setPreviousPage(location.pathname);
    }
  }, [location, mode, setPreviousPage]);

  return (
    <SC_SidebarContainer>
      <SC_ContentContainer>
        {mode === "NORMAL" ? (
          <>
            <SC_LogoImage
              title="View Today"
              src={logoImg}
              onClick={() => navigateToViewsPage("TODAY")}
            />
            {selectedView === "TASK" ? (
              <SC_InfoContainer title="Viewing Task">
                <FaCircleInfo style={STYLE_ICON_MARGINS} /> Viewing a Task
              </SC_InfoContainer>
            ) : (
              <></>
            )}
            <SC_OptionsContainer $isTagContainer={false}>
              <SC_OptionsHeader>Views</SC_OptionsHeader>
              <SC_Button
                title="View Today"
                onClick={() => navigateToViewsPage("TODAY")}
                $isActive={getSelectedNormalView() === "TODAY"}
              >
                <MdToday style={STYLE_ICON_MARGINS} /> Today
              </SC_Button>
              <SC_Button
                title="View Upcoming"
                onClick={() => navigateToViewsPage("UPCOMING")}
                $isActive={getSelectedNormalView() === "UPCOMING"}
              >
                <MdUpcoming style={STYLE_ICON_MARGINS} /> Upcoming
              </SC_Button>
              <SC_Button
                title="View Previous"
                onClick={() => navigateToViewsPage("PREVIOUS")}
                $isActive={getSelectedNormalView() === "PREVIOUS"}
              >
                <PiRewindFill style={STYLE_ICON_MARGINS} /> Previous
              </SC_Button>
            </SC_OptionsContainer>
            <SC_OptionsContainer $isTagContainer={true}>
              <SC_OptionsHeader>Tags</SC_OptionsHeader>
              {isLoading ? (
                <BarLoader
                  color={STYLE_TEXT_COLOR}
                  height={BAR_LOADER_HEIGHT}
                  width={BAR_LOADER_WIDTH + 64}
                />
              ) : (
                <SC_TagListContaier>
                  {tags?.map((each) => (
                    <SC_Button
                      key={each.sId}
                      title={`View Tag ${each.name}`}
                      onClick={() => navigateToViewsPage("TAG", each.sId)}
                      $isActive={each.sId === getSelectedTagId()}
                      $color={each.colorHex}
                    >
                      <FaHashtag style={STYLE_ICON_MARGINS} /> {each.name}
                    </SC_Button>
                  ))}
                  <AddButton text="Create a new Tag" />
                </SC_TagListContaier>
              )}
            </SC_OptionsContainer>
          </>
        ) : (
          <>
            <SC_BackButtonContainer>
              <SC_Button
                title="Back button"
                onClick={() => navigate(previousPage)}
                $isActive={false}
              >
                <IoCaretBackCircle style={STYLE_ICON_MARGINS} />
                Back
              </SC_Button>
            </SC_BackButtonContainer>
            <SC_OptionsContainer $isTagContainer={false}>
              <SC_OptionsHeader>Settings</SC_OptionsHeader>
              <SC_Button
                title="View profile"
                onClick={() => navigateToViewsPage("PROFILE")}
                $isActive={getSelectedSettingsView() === "PROFILE"}
              >
                <FaUserCircle style={STYLE_ICON_MARGINS} />
                View Profile
              </SC_Button>
              <SC_Button
                title="Edit Name"
                onClick={() => navigateToViewsPage("NAME_EDIT")}
                $isActive={getSelectedSettingsView() === "NAME_EDIT"}
              >
                <FaUserEdit style={STYLE_ICON_MARGINS} />
                Edit Name
              </SC_Button>
              <SC_Button
                title="Edit Email"
                onClick={() => navigateToViewsPage("EMAIL_EDIT")}
                $isActive={getSelectedSettingsView() === "EMAIL_EDIT"}
              >
                <MdEmail style={STYLE_ICON_MARGINS} />
                Edit Email
              </SC_Button>
              <SC_Button
                title="Change Password"
                onClick={() => navigateToViewsPage("PASS_EDIT")}
                $isActive={getSelectedSettingsView() === "PASS_EDIT"}
              >
                <PiPasswordFill style={STYLE_ICON_MARGINS} />
                Change Password
              </SC_Button>
              <SC_Button
                title="Logout"
                onClick={() => navigateToViewsPage("LOGOUT")}
                $isActive={getSelectedSettingsView() === "LOGOUT"}
              >
                <RiLogoutCircleRFill style={STYLE_ICON_MARGINS} />
                Logout
              </SC_Button>
              <SC_DeleteButton
                title="Delete Account"
                onClick={() => navigateToViewsPage("DEL_ACC")}
                $isActive={getSelectedSettingsView() === "DEL_ACC"}
              >
                <MdDelete style={STYLE_ICON_MARGINS} />
                Delete Account
              </SC_DeleteButton>
            </SC_OptionsContainer>
          </>
        )}
      </SC_ContentContainer>
      <SC_ProfileContainer
        title="Profile Settings"
        onClick={() => navigateToViewsPage("PROFILE")}
        $isActive={mode === "SETTINGS"}
      >
        <SC_ProfileImage src={profileImg} />
        <p>{userName}</p>
      </SC_ProfileContainer>
    </SC_SidebarContainer>
  );
};

export default SideBar;
