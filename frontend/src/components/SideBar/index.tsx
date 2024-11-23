import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { FaHashtag } from "react-icons/fa6";
import { MdToday } from "react-icons/md";
import { PiRewindFill } from "react-icons/pi";
import { MdUpcoming } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";

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
} from "./styles";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  PREVIOUS_PAGE_URL,
  STYLE_ICON_MARGINS,
  STYLE_TEXT_COLOR,
  TAG_PAGE_URL_NO_PARAM,
  TODAY_PAGE_URL,
  UPCOMING_PAGE_URL,
} from "../../constants";
import { AddButton } from "../AddButton";

type SideBarProps = {
  mode: "SETTINGS" | "NORMAL";
  selectedView: SelectedView;
  selectedTag: string | undefined;
};

const SideBar = ({ mode, selectedView, selectedTag }: SideBarProps) => {
  const [tags, setTags] = useState<Tag[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  const getTags = useCallback(async () => {
    if (mode === "SETTINGS") return;
    setIsLoading(true);
    try {
      const data = await getTagsAPI();
      const userData = await getUserAPI();
      setUserName(userData.fullName);
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
    }
  };

  useEffect(() => {
    getTags().catch((e) => console.log(e));
  }, [getTags]);

  return (
    <SC_SidebarContainer>
      <SC_ContentContainer>
        <SC_LogoImage title="Home" src={logoImg} />
        {mode === "NORMAL" ? (
          <>
            {selectedView === "TASK" ? (
              <SC_InfoContainer title="Viewing Task">
                <FaCircleInfo style={STYLE_ICON_MARGINS} /> Viewing a Task
              </SC_InfoContainer>
            ) : (
              <></>
            )}
            <SC_OptionsContainer>
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
            <SC_OptionsContainer>
              <SC_OptionsHeader>Tags</SC_OptionsHeader>
              {isLoading ? (
                <BarLoader
                  color={STYLE_TEXT_COLOR}
                  height={BAR_LOADER_HEIGHT}
                  width={BAR_LOADER_WIDTH + 64}
                />
              ) : (
                <>
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
                </>
              )}
            </SC_OptionsContainer>
          </>
        ) : (
          <SC_OptionsContainer>
            <SC_OptionsHeader>Settings</SC_OptionsHeader>
            <SC_Button
              title="Edit Name"
              $isActive={getSelectedSettingsView() === "NAME_EDIT"}
            >
              Edit Name
            </SC_Button>
            <SC_Button
              title="Edit Email"
              $isActive={getSelectedSettingsView() === "EMAIL_EDIT"}
            >
              Edit Email
            </SC_Button>
            <SC_Button
              title="Change Password"
              $isActive={getSelectedSettingsView() === "PASS_EDIT"}
            >
              Change Password
            </SC_Button>
            <SC_Button
              title="Logout"
              $isActive={getSelectedSettingsView() === "LOGOUT"}
            >
              Logout
            </SC_Button>
            <SC_Button
              title="Delete Account"
              $isActive={getSelectedSettingsView() === "DEL_ACC"}
            >
              Delete Account
            </SC_Button>
          </SC_OptionsContainer>
        )}
      </SC_ContentContainer>
      <SC_ProfileContainer title="Profile Settings">
        <SC_ProfileImage src={profileImg} />
        <p>{userName}</p>
      </SC_ProfileContainer>
    </SC_SidebarContainer>
  );
};

export default SideBar;
