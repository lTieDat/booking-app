// import axiosInstance from "../Config/axiousConfig";
import { post, get, remove } from "../utils/index";
import Cookies from "js-cookie";

//refresh token function
export const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      return null;
    }
    const response = await post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });
    const data = await response;
    Cookies.set("accessToken", data.accessToken, { expires: 1 / 1440 }); // 1 minute
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};
//end refresh token function

//login function
export const login = async (email, password, rememberMe) => {
  try {
    const response = await post("/users/login", {
      email: email,
      password: password,
      rememberMe: rememberMe,
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  const response = await post("/auth/logout");
  return response;
};

export const register = async (email, password, fullname) => {
  try {
    const response = await post("/users/register", {
      email: email,
      password: password,
      fullName: fullname,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const verifyEmail = async (email, code) => {
  try {
    const response = await post("/users/verify", {
      otp: code,
      email: email,
    });
    console.log("response in utils:", response);
    return response;
  } catch (error) {
    console.error("Verify error:", error);
    throw error;
  }
};

export const getCountriesList = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    return response.json();
  } catch (error) {
    console.error("Get countries error:", error);
    throw error;
  }
};

export const getPrefixes = async () => {
  try {
    const response = await get("/users/prefix");
    return response.data;
  } catch (error) {
    console.error("Get prefixes error:", error);
    throw error;
  }
};

export const getUserByToken = async (token) => {
  try {
    const response = await get(`/users/me?tokenID=${token}`);
    return response.data;
  } catch (error) {
    console.error("Get user by token error:", error);
    throw error;
  }
};

export const updateProfile = async (token, data) => {
  try {
    const response = await post(`/users/updateUser?tokenID=${token}`, data);
    return response;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};
