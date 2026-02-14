import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const saveContactSession = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        referrer: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    const sessionId = await ctx.db.insert("contactSessions", {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      metadata: args.metadata,
      expiresAt,
    });

    return sessionId;
  },
});
