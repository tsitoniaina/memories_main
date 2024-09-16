import { atomWithReset, atomWithStorage, loadable } from "jotai/utils";
import { atom } from "jotai/index";
import { fetchMemories } from "@/app/actions/query";
import { sortOptions, sortType } from "@/types.ts";

export type MessageType = {
  uuid: string;
  memory: string;
  post_at: Date;
};
export const messageIdAtom = atomWithStorage("messageId", "");

export const dataAtom = atomWithReset<MessageType[]>([]);
export const sortValueAtom = atom<sortType>(sortOptions.today);
