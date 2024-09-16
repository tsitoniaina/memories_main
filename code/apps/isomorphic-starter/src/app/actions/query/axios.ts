"use server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options.ts";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);

    if (session?.apiToken) {
      config.headers["Authorization"] = `Bearer ${session.apiToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
