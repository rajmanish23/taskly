import Cookies from "js-cookie";
import { AxiosError } from "axios";

import api from "../api";
import {
  ACCESS_KEY,
  LOGIN_API_URL,
  REFRESH_KEY,
  REGISTER_API_URL,
} from "../constants";

export async function loginAPI(
  email: string,
  password: string
): Promise<[isSuccess: boolean, errorMsg: string]> {
  try {
    const res = await api.post(LOGIN_API_URL, { email, password });
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
          return [
            false,
            "Either your Email or Password is incorrect. Please type again.",
          ];
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
    const res = await api.post(REGISTER_API_URL, {
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
