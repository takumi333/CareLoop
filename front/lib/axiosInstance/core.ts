import axios from "axios";


const resolveBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://back:3000/api/v1`;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`;
  }
}

const coreAxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default coreAxiosInstance