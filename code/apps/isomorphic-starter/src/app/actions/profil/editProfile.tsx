"use server";

import process from "node:process";
import axiosInstance from "@/app/actions/query/axios.ts";

export default async function editProfile(id: string) {
  try {
    const response = await axiosInstance.patch(`${process.env.API_URL}/api/user/update/profile-${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
}
