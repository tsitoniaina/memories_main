"use server";

import axiosInstance from "@/app/actions/query/axios.ts";
import process from "node:process";
import { MessageType } from "@/data/support-inbox.ts";
import { sortOptions, sortType } from "@/types.ts";
const postMemory = async (payloads: { post: string }) => {
  const session = await axiosInstance.post(
    `${process.env.API_URL}/api/memory/create`,
    payloads,
  );
  return <{ uuid: string }>session.data;
};

const fetchMemories = async (filter: sortType = sortOptions.today) => {
  const session = await axiosInstance.get(
    `${process.env.API_URL}/api/memory/lists?sort=${filter}`,
  );
  return <Array<MessageType>>session.data;
};

export { postMemory, fetchMemories };
