"use client";

import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Select, Title } from "rizzui";
import cn from "@utils/class-names";
import { useMedia } from "@hooks/use-media";
import { getRelativeTime } from "@utils/get-relative-time";
import rangeMap from "@utils/range-map";
import { routes } from "@/config/routes";
import {
  dataAtom,
  messageIdAtom,
  MessageType,
  sortValueAtom,
} from "@/data/support-inbox";
import { LineGroup, Skeleton } from "@ui/skeleton";
import SimpleBar from "@ui/simplebar";
import { fetchMemories } from "@/app/actions/query";
import { PiCaretDownBold } from "react-icons/pi";
import { filterOption, sortOptions, sortType } from "@/types.ts";

interface MessageItemProps {
  message: MessageType;
  className?: string;
}

export function MessageItem({ className, message }: MessageItemProps) {
  const hoverRef = useRef(null);
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1023px)", false);
  const [messageId, setMessageId] = useAtom(messageIdAtom);
  const isActive = messageId === message.uuid;
  const url = routes.support.messageDetails(messageId);

  function handleChange() {
    setMessageId(message.uuid);
    // router.push(url);
    if (isMobile) {
      router.push(url);
    }
  }

  return (
    <div
      ref={hoverRef}
      onClick={handleChange}
      className={cn(
        className,
        "grid cursor-pointer items-start gap-3 border-t border-muted p-5 hover:bg-gray-50 dark:hover:bg-gray-800",
        isActive && "border-t-2 border-t-primary dark:bg-gray-100/70",
      )}
    >
      <div>
        <div className="flex items-center justify-between lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
          <Title as="h4" className="flex items-center">
            <span className="text-sm font-semibold dark:text-gray-700">
              {getRelativeTime(message.post_at)}
            </span>
          </Title>
        </div>
        <div
          className="mt-1 line-clamp-3 text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: message.memory }}
        />
      </div>
    </div>
  );
}

interface InboxListProps {
  className?: string;
}

export default function MessageList({ className }: InboxListProps) {
  const [data, setData] = useAtom(dataAtom);
  const [sortBy, setSortBy] = useAtom(sortValueAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const query = async (sort: sortType = "this_week") => {
    setIsLoading(true);
    const _data = await fetchMemories(sort);
    setIsLoading(false);
    setData(_data);
  };

  useEffect(() => {
    query(sortBy);
  }, [sortBy]);

  return (
    <>
      <div className={cn(className, "sticky")}>
        <div className="mb-7 flex items-center justify-between">
          <Select
            size="sm"
            variant="text"
            value={sortBy}
            options={filterOption}
            getOptionValue={(option) => option.value}
            onChange={(option: sortType) => setSortBy(option)}
            displayValue={(selected) =>
              filterOption.find((o) => o.value === selected)?.label
            }
            suffix={<PiCaretDownBold className="w- ml-2 h-3.5 w-3.5" />}
            selectClassName="text-sm px-2.5"
            optionClassName="text-sm"
            dropdownClassName="p-2 !w-32 !z-0"
            placement="bottom-end"
            className={"w-auto"}
          />
        </div>
        <div className="overflow-hidden rounded-lg border border-muted">
          <SimpleBar className="max-h-[calc(100dvh-356px)] md:max-h-[calc(100dvh-311px)] lg:max-h-[calc(100dvh-240px)] xl:max-h-[calc(100dvh-230px)] 2xl:max-h-[calc(100dvh-240px)] 3xl:max-h-[calc(100dvh-270px)]">
            {isLoading ? (
              <div className="grid gap-4">
                {rangeMap(5, (i) => (
                  <MessageLoader key={i} />
                ))}
              </div>
            ) : (
              data.map((message) => (
                <MessageItem key={message.uuid} message={message} />
              ))
            )}
          </SimpleBar>
        </div>
      </div>
    </>
  );
}

export function MessageLoader() {
  return (
    <div className="grid gap-3 border-t border-muted p-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-3 w-32 rounded" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="ml-auto h-3 w-16 rounded" />
      </div>
      <LineGroup
        columns={6}
        className="grid-cols-6 gap-1.5"
        skeletonClassName="h-2"
      />
      <LineGroup
        columns={5}
        className="grid-cols-5 gap-1.5"
        skeletonClassName="h-2"
      />
      <LineGroup
        columns={4}
        className="grid-cols-4 gap-1.5"
        skeletonClassName="h-2"
      />
    </div>
  );
}
