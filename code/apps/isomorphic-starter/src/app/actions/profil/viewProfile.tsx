"use server";
import process from "node:process";
import axiosInstance from "@/app/actions/query/axios.ts";

export default async function viewProfile() {
  try {
    const response = await axiosInstance.get(`${process.env.API_URL}/api/user/read/profile`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
}
