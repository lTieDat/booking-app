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
  console.log("email in handle:", email);
  console.log("password in handle:", password);
  console.log("rememberMe in handle:", rememberMe);
  // check ok
  // try {
  //   const response = await post("/auth/login", {
  //     username: email,
  //     password: password,
  //   });
  //   const { accessToken, refreshToken } = response;
  //   // Save tokens to cookies
  //   Cookies.set("accessToken", accessToken, { expires: 1 / 1440 }); // 1 minute
  //   Cookies.set("refreshToken", refreshToken, { expires: 1 }); // 1 day
  //   return response;
  // } catch (error) {
  //   console.error("Login error:", error);
  //   throw error;
  // }
};

export const logout = async () => {
  const response = await post("/auth/logout");
  return response;
};

export const fetchPosts = async (titleFilter, page) => {
  const response = await get(`/posts?title=${titleFilter}&page=${page}`);
  console.log(response.data);
  return response;
};

export const deletePost = async (postId) => {
  const response = await remove(`/posts/${postId}`);
  return response.ok;
};

export const addPost = async (post) => {
  const response = await post("/posts", post);
  return response;
};

export const fetchPostTags = async () => {
  const response = await get("/posts/tags");
  return response;
};
