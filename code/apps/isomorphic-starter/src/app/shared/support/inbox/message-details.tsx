"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Title, Badge, Button, Empty, Loader } from "rizzui";
import cn from "@utils/class-names";

import { SubmitHandler, Controller } from "react-hook-form";
import { Form } from "@ui/form";
import MessageBody from "@/app/shared/support/inbox/message-body";
import SimpleBar from "@ui/simplebar";
import { useElementSize } from "@hooks/use-element-size";
import { useMedia } from "@hooks/use-media";
import dynamic from "next/dynamic";
import Avatar from "@/layouts/Avatar.tsx";
import { useSession } from "next-auth/react";
import { postMemory } from "@/app/actions/query";
import { dataAtom, messageIdAtom } from "@/data/support-inbox.ts";
import { useAtom } from "jotai/index";

const QuillEditor = dynamic(() => import("@ui/quill-editor"), {
  ssr: false,
});

const FormSchema = z.object({
  post: z.string({ required_error: "Invalid post" }).min(10, {
    message: "Racontez vos histoires",
  }),
});

type FormValues = {
  post: string;
};

export default function MessageDetails({ className }: { className?: string }) {
  const [memories, setMemories] = useAtom(dataAtom);
  const [formResetValue, setFormResetValue] = useState<FormValues>({
    post: "",
  });
  const [messageId, setMessageId] = useAtom(messageIdAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, { width }] = useElementSize();
  const isWide = useMedia("(min-width: 1280px) and (max-width: 1440px)", false);
  const { data: sessionData } = useSession();

  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }

  const message = memories.find((m) => m.uuid === messageId) ?? memories[0];

  // set default selected message when render complete
  useEffect(() => {
    // setFormWidth(width);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500 milliseconds
    return () => clearTimeout(timer);
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const _data = await postMemory(data);
    if (_data.uuid) {
      setMessageId(_data.uuid);
      setMemories([
        { uuid: _data.uuid, memory: data.post, post_at: new Date() },
        ...memories,
      ]);
      setFormResetValue({ post: "" });
    }
  };
  if (isLoading) {
    return (
      <div
        className={cn(
          "!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center",
          className,
        )}
      >
        <Loader variant="spinner" size="xl" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative pt-6 lg:rounded-lg lg:border lg:border-muted lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6",
        className,
      )}
    >
      <div>
        {!message ? (
          <div
            className={cn(
              "!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center",
              className,
            )}
          >
            <Empty
              text="No conversations selected"
              textClassName="mt-4 text-base text-gray-500"
            />
          </div>
        ) : (
          <>
            <header className="flex flex-col justify-between gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
              <div className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
                <Title as="h4" className="font-semibold">
                  {sessionData?.user?.name}
                </Title>
                <Badge variant="outline" color="success" size="sm">
                  Memory channel
                </Badge>
              </div>
            </header>

            <div className="[&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5">
              <SimpleBar className="@3xl:max-h-[calc(100dvh-34rem)] @4xl:max-h-[calc(100dvh-32rem)] @7xl:max-h-[calc(100dvh-31rem)]">
                <MessageBody />
              </SimpleBar>
            </div>
          </>
        )}
        <div
          ref={ref}
          className="grid grid-cols-[32px_1fr] items-start gap-3 rounded-b-lg bg-white @3xl:pt-4 lg:gap-4 lg:pl-0 xl:grid-cols-[48px_1fr] dark:bg-transparent dark:lg:pt-0"
        >
          <figure className="dark:mt-4">
            <Avatar />
          </figure>
          <div
            className="relative rounded-lg border border-muted bg-gray-50 p-4 2xl:p-5"
            style={{
              maxWidth: formWidth(),
            }}
          >
            <Form<FormValues>
              onSubmit={onSubmit}
              validationSchema={FormSchema}
              resetValues={formResetValue}
            >
              {({ control, watch, formState: { errors, isSubmitting } }) => {
                return (
                  <>
                    {errors?.post?.message && (
                      <span className="text-red-600/80">
                        {errors.post.message}
                      </span>
                    )}
                    <Controller
                      control={control}
                      name="post"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          className="rounded-md bg-gray-0 dark:bg-gray-50 [&>.ql-container_.ql-editor]:min-h-[100px]"
                        />
                      )}
                    />
                    <div className="relative mt-2.5 flex items-center justify-end">
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="dark:bg-gray-200 dark:text-white"
                      >
                        Send
                      </Button>
                    </div>
                  </>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  );
}
