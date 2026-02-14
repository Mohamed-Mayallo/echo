import { v } from "convex/values";
import { query } from "../_generated/server";

export const getConversation = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const conversation = await ctx.db.get(conversationId);
    if (!conversation) {
      return { error: "No conversation" };
    }

    const contactSession = await ctx.db.get("contactSessions", conversation.contactSessionId);
    if (!contactSession || contactSession.expiresAt < Date.now()) {
      return { error: "Invalid contact session" };
    }

    return {
      error: null,
      threadId: conversation.threadId,
      status: conversation.status,
    };
  },
});
