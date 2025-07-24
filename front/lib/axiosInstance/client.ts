"use client";
import axios from "axios";


const resolveBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    // proxy api
    return `http://localhost:3000/api/v1`;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`;
  }
}

export const clientAxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// export const clientAxiosInstance = coreAxiosInstance;

// cookieヘッダーは自動で付く