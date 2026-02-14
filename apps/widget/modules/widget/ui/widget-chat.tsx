"use client";

import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useAtomValue, useSetAtom } from "jotai";
import {
  conversationThreadId,
  organizationIdAtom,
  screenAtom,
  sessionConversationId,
  sessionIdAtomFamily,
} from "../store";
import { useEffect } from "react";

export const WidgetChat = () => {
  const organizationId = useAtomValue(organizationIdAtom)!;
  const setScreen = useSetAtom(screenAtom);
  const setConversationThreadId = useSetAtom(conversationThreadId);
  const conversationId = useAtomValue(sessionConversationId);
  const contactSessionId = useAtomValue(sessionIdAtomFamily(organizationId))!;

  const conversation = useQuery(
    api.conversations.queries.getConversation,
    conversationId ? { conversationId } : "skip",
  );

  useEffect(() => {
    try {
      if (!conversation) {
        return;
      }

      if (conversation.error) {
        setScreen("error");
        setConversationThreadId(undefined);
        return;
      }

      if (!organizationId || !contactSessionId) {
        setScreen("auth");
        return;
      }

      setConversationThreadId(conversation.threadId);
    } catch (e) {
      console.log(e, "ffffffffff");
    }
  }, [conversation, organizationId, contactSessionId, setScreen, setConversationThreadId]);

  return (
    <div className="flex flex-col grow justify-center items-center gap-4 p-4 bg-error w-full h-full">
      Chatting ...
    </div>
  );
};
