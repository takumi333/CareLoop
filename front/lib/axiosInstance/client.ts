"use client";
import axios from "axios";


const resolveBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return `/api/req`;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`;
  }
}

export const clientAxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  // cookieヘッダーは付与
  withCredentials: true,
});

// export const clientAxiosInstance = coreAxiosInstance;

// 