import axios from "axios";
import { BASE_API_URL } from "../constants";

const pingAPI = async (): Promise<boolean> => {
  try {
    await axios.get(BASE_API_URL);
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
