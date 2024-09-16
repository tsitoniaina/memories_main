"use server";

import process from "node:process";
import { GoogleProfile } from "next-auth/providers/google";
import { DEFAULT_PASSWORD } from "@/config/constants.ts";
const axios = require("axios").default;
export async function createGoogleUser(
  payloads: GoogleProfile,
): Promise<{ token: string } | false> {
  try {
    const query = await axios.post(
      `${process.env.API_URL}/account/google/create`,
      {
        ...payloads,
        firstname: payloads.family_name,
        password: DEFAULT_PASSWORD,
        active: true,
      },
      {
        "Content-type": "application/json",
      },
    );

    return <{ token: string }>query.data;
  } catch (error) {
    return false;
  }
}
