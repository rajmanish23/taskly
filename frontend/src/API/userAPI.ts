import Cookies from "js-cookie";
import { AxiosError } from "axios";

import baseTokenfulAPI from "./baseAPI";
import {
  ACCESS_KEY,
  USER_API_URL,
  LOCAL_USER_KEY,
  LOGIN_API_URL,
  REFRESH_KEY,
  REGISTER_API_URL,
  USER_DELETE_API,
  UPDATE_NAME_API,
  UPDATE_EMAIL_API,
  UPDATE_PASSWORD_API,
} from "../constants";
import { baseTokenlessAPI } from "./isAuthorizedAPI";
import { handleError } from "./utils";

export async function loginAPI(
  email: string,
  password: string
): Promise<[isSuccess: boolean, errorMsg: string]> {
  try {
    const res = await baseTokenlessAPI.post(LOGIN_API_URL, { email, password });
    if (res.data.access === undefined && res.data.refresh === undefined) {
      throw Error("API Response does not have access and refresh tokens");
    }
    Cookies.set(ACCESS_KEY, res.data.access, {
      sameSite: "Strict",
      secure: true,
    });
    Cookies.set(REFRESH_KEY, res.data.refresh, {
      sameSite: "Strict",
      secure: true,
    });
    return [true, ""];
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (Math.floor(error.response.status / 100) === 4) {
          return [false, error.response.data.detail];
        } else if (Math.floor(error.response.status / 100) === 5) {
          return [
            false,
            "It seems like we have some server issues. Please try again later.",
          ];
        }
      } else if (error.request) {
        return [
          false,
          "It seems like we are having some connectivity issues. Please try again later.",
        ];
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
  return [false, "!!Some edge case has occured that needs resolving!!"];
}

export async function registerAPI(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<[isSuccess: boolean, errorMsg: string]> {
  try {
    const res = await baseTokenlessAPI.post(REGISTER_API_URL, {
      email,
      password,
      firstName,
      lastName,
    });
    if (res.status === 201) {
      return [true, ""];
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (Math.floor(error.response.status / 100) === 4) {
          return [false, "!!Stub error!! :: Check logs for actual error!!"];
        } else if (Math.floor(error.response.status / 100) === 5) {
          return [
            false,
            "It seems like we have some server issues. Please try again later.",
          ];
        }
      } else if (error.request) {
        return [
          false,
          "It seems like we are having some connectivity issues. Please try again later.",
        ];
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
  return [false, "!!Some edge case has occured that needs resolving!!"];
}

export async function getUserAPI(): Promise<User> {
  const localUserData = sessionStorage.getItem(LOCAL_USER_KEY);
  if (localUserData !== null) {
    return JSON.parse(localUserData);
  }
  const res = await baseTokenfulAPI.get(USER_API_URL);
  const apiUserData: User = {
    email: res.data.email,
    firstName: res.data.first_name,
    lastName: res.data.last_name,
    fullName: res.data.first_name + " " + res.data.last_name,
  };
  sessionStorage.setItem(LOCAL_USER_KEY, JSON.stringify(apiUserData));
  return apiUserData;
}

export async function deleteUserAPI(): Promise<APIStatusMessage> {
  try {
    await baseTokenfulAPI.delete(USER_DELETE_API);
    return { detail: "User deleted successfully", isError: false };
  } catch (err) {
    return handleError(err);
  }
}

export async function updateNameAPI(
  firstName: string,
  lastName: string,
  password: string
): Promise<APIStatusMessage> {
  try {
    await baseTokenfulAPI.put(UPDATE_NAME_API, {
      firstName,
      lastName,
      password,
    });
    return { detail: "Name updated successfully", isError: false };
  } catch (err) {
    return handleError(err);
  }
}

export async function updateEmailAPI(
  newEmail: string,
  password: string
): Promise<APIStatusMessage> {
  try {
    await baseTokenfulAPI.put(UPDATE_EMAIL_API, {
      newEmail,
      password,
    });
    return { detail: "Email updated successfully", isError: false };
  } catch (err) {
    return handleError(err);
  }
}

export async function updatePasswordAPI(
  oldPassword: string,
  newPassword: string
): Promise<APIStatusMessage> {
  try {
    await baseTokenfulAPI.put(UPDATE_PASSWORD_API, {
      oldPassword,
      newPassword,
    });
    return { detail: "Password updated successfully", isError: false };
  } catch (err) {
    return handleError(err);
  }
}
