"use client";

import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useAtomValue, useSetAtom } from "jotai";
import {
  organizationIdAtom,
  screenAtom,
  sessionConversationId,
  sessionErrorAtom,
  sessionIdAtomFamily,
  sessionLoadingMessageAtom,
} from "../store";
import { MessageCircle } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export const WidgetSelection = () => {
  const organizationId = useAtomValue(organizationIdAtom)!;
  const setScreen = useSetAtom(screenAtom);
  const setSessionErrorAtom = useSetAtom(sessionErrorAtom);
  const setLoadingMessage = useSetAtom(sessionLoadingMessageAtom);
  const setSessionConversationId = useSetAtom(sessionConversationId);
  const contactSessionId = useAtomValue(sessionIdAtomFamily(organizationId))!;

  const createConversation = useMutation(api.conversations.mutations.createConversation);

  const handleCreateConversation = () => {
    setScreen("loading");
    setLoadingMessage("Creating conversation...");

    createConversation({
      contactSessionId,
      organizationId,
    })
      .then((conversationId) => {
        setSessionConversationId(conversationId);
        setScreen("chat");
      })
      .catch((e) => {
        setSessionErrorAtom(e.data);
        setScreen("error");
      });
  };

  return (
    <div className="flex flex-col grow items-center gap-4 p-4 bg-error w-full h-full">
      <Button
        className="flex justify-start gap-4 items-center w-full"
        variant="ghost"
        size="lg"
        onClick={handleCreateConversation}
      >
        <MessageCircle size="lg" />
        <span>Chat</span>
      </Button>
    </div>
  );
};
