import Cookies from "js-cookie";
import { refreshAccessToken } from "../service/userService";
const API_DOMAIN = "http://localhost:3002/api/v1";

const getAuthHeaders = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

const checkTokenExpiration = async () => {
  let accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }
  return accessToken;
};

export const get = async (path) => {
  try {
    await checkTokenExpiration();
    const response = await fetch(API_DOMAIN + path, {
      method: "GET",
      headers: {
        // ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const post = async (path, body) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

export const put = async (path, body) => {
  try {
    await checkTokenExpiration();
    const response = await fetch(API_DOMAIN + path, {
      method: "PUT",
      headers: {
        // ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`PUT request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

export const remove = async (path) => {
  try {
    await checkTokenExpiration();
    const response = await fetch(API_DOMAIN + path, {
      method: "DELETE",
      headers: {
        // ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`DELETE request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};
