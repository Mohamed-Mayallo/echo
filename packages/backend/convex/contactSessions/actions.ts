import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { internal, api } from "../_generated/api";
import { Id } from "../_generated/dataModel";

export const createContactSession = action({
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
  handler: async (ctx, args): Promise<Id<"contactSessions">> => {
    const { valid } = await ctx.runAction(api.organizations.actions.validateOrganization, {
      organizationId: args.organizationId,
    });

    if (!valid) {
      throw new ConvexError("Invalid organization");
    }

    const sessionId = await ctx.runMutation(internal.contactSessions.mutations.saveContactSession, {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      metadata: args.metadata,
    });

    return sessionId;
  },
});
