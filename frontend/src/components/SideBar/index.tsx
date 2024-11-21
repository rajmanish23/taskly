import { useCallback, useEffect, useState } from "react";

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
  SC_AddTagButton,
} from "./styles";

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
        <SC_LogoImage src={logoImg} />
        {mode === "NORMAL" ? (
          <>
            <SC_OptionsContainer>
              <SC_OptionsHeader>Views</SC_OptionsHeader>
              <SC_Button $isActive={getSelectedNormalView() === "TODAY"}>
                Today
              </SC_Button>
              <SC_Button $isActive={getSelectedNormalView() === "UPCOMING"}>
                Upcoming
              </SC_Button>
              <SC_Button $isActive={getSelectedNormalView() === "PREVIOUS"}>
                Previous
              </SC_Button>
            </SC_OptionsContainer>
            <SC_OptionsContainer>
              <SC_OptionsHeader>Tags</SC_OptionsHeader>
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  {tags?.map((each) => (
                    <SC_Button
                      $isActive={each.sId === getSelectedTagId()}
                      key={each.sId}
                    >
                      {each.name}
                    </SC_Button>
                  ))}
                  <SC_AddTagButton>Add a new Tag</SC_AddTagButton>
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
      <SC_ProfileContainer>
        <SC_ProfileImage src={profileImg} />
        <p>{userName}</p>
      </SC_ProfileContainer>
    </SC_SidebarContainer>
  );
};

export default SideBar;
