import { useCallback, useEffect, useState } from "react";

import logoImg from "../../assets/taskly-logo-big.png";
import profileImg from "../../assets/default-profile.jpg";
import { getTagsAPI } from "../../API/tagsAPI";
import { getUserAPI } from "../../API/userAPI";

type SideBarProps = {
  mode: "SETTINGS" | "NORMAL";
};

const SideBar = ({ mode }: SideBarProps) => {
  const [tags, setTags] = useState<Tag[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("")

  const getTags = useCallback(async () => {
    if (mode === "SETTINGS") return;
    setIsLoading(true);
    try {
      const data = await getTagsAPI();
      const userData = await getUserAPI();
      setUserName(userData.fullName)
      setTags(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    getTags().catch((e) => console.log(e));
  }, [getTags]);

  return (
    <div>
      <img src={logoImg} />
      {mode === "NORMAL" ? (
        <>
          <div>
            <p>Views</p>
            <button>Today</button>
            <button>Upcoming</button>
          </div>
          <div>
            <p>Tags</p>
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                {tags?.map((each) => (
                  <button key={each.sId}>{each.name}</button>
                ))}
                <button>Add a new Tag</button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div>Settings</div>
          <button>Edit Name</button>
          <button>Edit Email</button>
          <button>Change Password</button>
          <button>Logout</button>
          <button>Delete Account</button>
        </>
      )}
      <div>
        <img src={profileImg} />
        <p>{userName}</p>
      </div>
    </div>
  );
};

export default SideBar;
