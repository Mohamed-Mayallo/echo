import { v } from "convex/values";
import { defineTable } from "convex/server";

export const contactSessions = defineTable({
  name: v.string(),
  email: v.string(),
  expiresAt: v.number(),
  organizationId: v.string(),
  metadata: v.optional(
    v.object({
      ip: v.optional(v.string()),
      userAgent: v.optional(v.string()),
      referrer: v.optional(v.string()),
    }),
  ),
})
  .index("byOrganization", ["organizationId"])
  .index("byExpiresAt", ["expiresAt"]);
