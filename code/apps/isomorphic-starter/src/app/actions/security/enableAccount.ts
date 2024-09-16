"use server";
import { AxiosError } from "axios";
import process from "node:process";
const axios = require("axios").default;
type QueryResultType = { success: boolean; message?: string };
export default async function enableAccount(
  hash: string,
): Promise<QueryResultType> {
  try {
    const query = await axios.get(`${process.env.API_URL}/account/${hash}`);
    return <QueryResultType>query.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const _err = err as AxiosError<QueryResultType>;
      return <QueryResultType>_err?.response?.data;
    }
    return { success: false, message: "An error occured !" };
  }
}


 