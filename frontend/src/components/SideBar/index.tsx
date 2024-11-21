import { useCallback, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { FaHashtag } from "react-icons/fa6";

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
} from "./styles";
import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  STYLE_TEXT_COLOR,
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

  useEffect(() => {
    getTags().catch((e) => console.log(e));
  }, [getTags]);

  return (
    <SC_SidebarContainer>
      <SC_ContentContainer>
        <SC_LogoImage title="Home" src={logoImg} />
        {mode === "NORMAL" ? (
          <>
            <SC_OptionsContainer>
              <SC_OptionsHeader>Views</SC_OptionsHeader>
              <SC_Button
                $isActive={getSelectedNormalView() === "TODAY"}
                title="View Today"
              >
                Today
              </SC_Button>
              <SC_Button
                $isActive={getSelectedNormalView() === "UPCOMING"}
                title="View Upcoming"
              >
                Upcoming
              </SC_Button>
              <SC_Button
                $isActive={getSelectedNormalView() === "PREVIOUS"}
                title="View Previous"
              >
                Previous
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
                      $isActive={each.sId === getSelectedTagId()}
                      $color={each.colorHex}
                      key={each.sId}
                      title={`View Tag ${each.name}`}
                    >
                      <FaHashtag style={{ marginRight: 5 }} /> {each.name}
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
            <SC_Button $isActive={getSelectedSettingsView() === "NAME_EDIT"}>
              Edit Name
            </SC_Button>
            <SC_Button $isActive={getSelectedSettingsView() === "EMAIL_EDIT"}>
              Edit Email
            </SC_Button>
            <SC_Button $isActive={getSelectedSettingsView() === "PASS_EDIT"}>
              Change Password
            </SC_Button>
            <SC_Button $isActive={getSelectedSettingsView() === "LOGOUT"}>
              Logout
            </SC_Button>
            <SC_Button $isActive={getSelectedSettingsView() === "DEL_ACC"}>
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
