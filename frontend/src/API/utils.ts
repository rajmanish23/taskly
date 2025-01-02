import { AxiosError } from "axios";

export const handleError = (error: unknown): APIStatusMessage => {
  if (error instanceof AxiosError) {
    console.error(error);
    return {
      detail: error.response?.data.detail ?? "Unkown error occured",
      isError: true,
    };
  } else {
    console.error(error);
    return {
      detail: "Unkown error occured",
      isError: true,
    };
  }
};