import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { api } from "../_generated/api";
import { Id } from "../_generated/dataModel";

export const createConversation = mutation({
  args: {
    contactSessionId: v.id("contactSessions"),
    organizationId: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"conversations">> => {
    const { valid, contactSession } = await ctx.runQuery(
      api.contactSessions.queries.validateContactSession,
      {
        contactSessionId: args.contactSessionId,
      },
    );

    if (!valid) {
      throw new ConvexError("Invalid contact session");
    }
    if (contactSession?.organizationId !== args.organizationId) {
      throw new ConvexError("Invalid organization");
    }

    const conversationId = await ctx.db.insert("conversations", {
      threadId: "1234567890", // Todo
      contactSessionId: args.contactSessionId,
      organizationId: args.organizationId,
      status: "unresolved",
    });

    return conversationId;
  },
});
