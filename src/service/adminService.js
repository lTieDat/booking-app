// import axiosInstance from "../Config/axiousConfig";
import { post, get, remove } from "../utils/index";
import Cookies from "js-cookie";

//login for manager function
export const loginManager = async (email, password) => {
  try {
    const response = await post("/admin/login", {
      email: email,
      password: password,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Login manager error:", error);
    throw error;
  }
};

export const logout = async () => {
  const response = await post("/auth/logout");
  return response;
};

export const getDashboardData = async (token) => {
  try {
    const response = await get(`/admin/dashboard/${token}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Get dashboard data error:", error);
    throw error;
  }
};
