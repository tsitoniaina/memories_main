"use client";
import { useSession } from "next-auth/react";
import { Avatar as Profile } from "rizzui";
const Avatar = () => {
  const { data } = useSession();
  return (
    <Profile
      src={data?.user?.image || data?.payloads?.picture}
      name={data?.user?.name || data?.payloads?.name || ""}
    />
  );
};
export default Avatar;
