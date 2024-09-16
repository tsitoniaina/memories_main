import { DefaultSession, DefaultUser, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendUser = DefaultSession["user"];
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendUser;
    apiToken: string;
    payloads: User;
  }

  interface User extends DefaultUser {
    apiToken: string;
    firstname: string;
    name: string;
    roles: string[];
    picture?: string;
  }
}
declare module "next-auth/jwt" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT {
    /** OpenID ID Token */
    payloads?: User;
  }
}
