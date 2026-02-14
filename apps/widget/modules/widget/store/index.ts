import { Id } from "@workspace/backend/_generated/dataModel";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomFamily } from "jotai-family";

export const organizationIdAtom = atom<string | null>(null);

export type WidgetScreen = "auth" | "loading" | "error" | "selection";

export const screenAtom = atom<WidgetScreen>("loading");

export const sessionIdAtomFamily = atomFamily((organizationId: string) => {
  return atomWithStorage<Id<"contactSessions"> | null>(`${organizationId}_session_id`, null);
});

export const sessionErrorAtom = atom<string | null>(null);

export const sessionLoadingMessageAtom = atom<string | null>(null);
