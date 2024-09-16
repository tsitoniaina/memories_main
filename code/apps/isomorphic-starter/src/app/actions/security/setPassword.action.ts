"use server";
import process from "node:process";
import { AxiosError } from "axios";
import { ErrorType, SettingPasswordPayloadsType } from "@/types.ts";

const axios = require("axios").default;

export async function setPassword(
  prev: ErrorType | null | undefined,
  payloads: SettingPasswordPayloadsType,
): Promise<ErrorType | null | undefined> {
  try {
    const { hash, ...pass } = payloads;
    const query = await axios.post(
      `${process.env.API_URL}/account/${hash}/change-password`,
      pass,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorType>;
      return {
        message: _error.response?.data?.message || "Error!",
      };
    }
  }
  return null;
}
