"use server";
import process from "node:process";
import { AxiosError } from "axios";
import { ErrorType, RecoverPasswordStateType } from "@/types.ts";

const axios = require("axios").default;

export async function querySetPassword(
  prev: RecoverPasswordStateType,
  email: string,
): Promise<RecoverPasswordStateType> {
  try {
    await axios.post(`${process.env.API_URL}/account/recover-password`, {
      email,
    });
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
