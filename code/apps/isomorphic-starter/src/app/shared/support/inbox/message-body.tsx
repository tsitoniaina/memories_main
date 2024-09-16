"use client";

import { useAtomValue } from "jotai";
import { FiExternalLink } from "react-icons/fi";
import { Title, Text } from "rizzui";
import { getRelativeTime } from "@utils/get-relative-time";

import { DotSeparator } from "@/app/shared/support/inbox/message-details";
import Avatar from "@/layouts/Avatar.tsx";
import { useSession } from "next-auth/react";
import { dataAtom, messageIdAtom } from "@/data/support-inbox.ts";

export default function MessageBody() {
  const data = useAtomValue(dataAtom);
  const messageId = useAtomValue(messageIdAtom);
  const { data: sessionData } = useSession();

  const message = data.find((m) => m.uuid === messageId);

  return (
    <div>
      <div className="grid grid-cols-[32px_1fr] items-start gap-3 lg:gap-4 xl:grid-cols-[48px_1fr]">
        <Avatar />
        <div className="-mt-1.5 lg:mt-0">
          <div className="flex items-center justify-between">
            <Title as="h3" className="text-sm font-medium">
              {sessionData?.user?.name}
            </Title>
          </div>
          <div className="mt-1.5 items-center gap-2 text-xs text-gray-500 lg:flex">
            <span className="flex items-center lowercase">
              {sessionData?.user?.email}{" "}
              <FiExternalLink className="ml-1 h-2.5 w-2.5" />
            </span>
            <DotSeparator className="hidden lg:block" />
            <span className="mt-1.5 flex items-center lg:mt-0">
              #{message?.uuid}{" "}
            </span>
            <DotSeparator className="hidden lg:block" />
            <span>Open {getRelativeTime(message?.post_at as Date)}</span>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-3 grid gap-2 leading-relaxed xl:ml-16 2xl:mt-4">
        <Text dangerouslySetInnerHTML={{ __html: message?.memory || "" }} />
      </div>
    </div>
  );
}
