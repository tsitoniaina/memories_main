import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { pagesOptions } from "./pages-options";
import { routes } from "@/config/routes.ts";
import * as process from "node:process";
import { AxiosError } from "axios";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { createGoogleUser } from "@/app/actions/user/google.action.ts";

const axios = require("axios").default;

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 12 * 10, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      const { payloads } = token;
      const apiToken = payloads?.apiToken;
      return {
        ...session,
        apiToken,
        payloads,
      };
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        switch (account?.provider) {
          case "google":
            const query = await createGoogleUser(<GoogleProfile>profile);
            if (typeof query === "object") {
              token.payloads = {
                ...(<User>jwtDecode(query.token)),
                apiToken: query.token,
              };
            }
            break;
          case "credentials":
            token.payloads = user;
            break;
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + routes.dashboard;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid
          const query = await axios.post(
            `${process.env.API_URL}/api/login_check`,
            credentials,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const { email } = credentials;
          const payloads = jwtDecode<{ firstname: string; name: string }>(
            query.data.token,
          );
          return { email, apiToken: query.data.token, ...payloads } as User;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;
            const data = axiosError?.response?.data;
            if (data?.message) {
              throw new Error(data.message);
            }
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
