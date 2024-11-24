import { useEffect, useState, useCallback } from "react";
import { getUserAPI } from "../../API/userAPI";

const SettingsProfileView = () => {
  const [userDetails, setUserDetails] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await getUserAPI();
      setUserDetails(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserDetails().catch((e) => console.log(e));
  }, [getUserDetails]);

  return <div>SettingsProfileView</div>;
};

export default SettingsProfileView;
