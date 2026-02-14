import { v } from "convex/values";
import { query } from "../_generated/server";

export const validateContactSession = query({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, { contactSessionId }) => {
    try {
      const contactSession = await ctx.db.get(contactSessionId);

      if (!contactSession) {
        return { valid: false };
      }

      if (contactSession.expiresAt < Date.now()) {
        return { valid: false };
      }

      return { valid: true };
    } catch {
      return { valid: false };
    }
  },
});
