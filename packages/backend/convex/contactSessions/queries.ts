import { v } from "convex/values";
import { query } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

export const validateContactSession = query({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (
    ctx,
    { contactSessionId },
  ): Promise<{
    valid: boolean;
    contactSession?: Doc<"contactSessions">;
  }> => {
    try {
      const contactSession = await ctx.db.get(contactSessionId);

      if (!contactSession) {
        return { valid: false };
      }

      if (contactSession.expiresAt < Date.now()) {
        return { valid: false };
      }

      return { valid: true, contactSession };
    } catch {
      return { valid: false };
    }
  },
});
