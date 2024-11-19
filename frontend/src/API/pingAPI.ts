import axios from "axios";
import baseAPI from "./baseAPI";

const pingAPI = async (): Promise<boolean> => {
  try {
    await baseAPI.get("");
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.request) {
        return false;
      } else {
        console.error(error);
        return false;
      }
    } else {
      console.error(error);
      return false;
    }
  }
};

export default pingAPI;
