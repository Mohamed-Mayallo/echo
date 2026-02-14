import { v } from "convex/values";
import { defineTable } from "convex/server";

export const conversations = defineTable({
  threadId: v.string(),
  contactSessionId: v.id("contactSessions"),
  organizationId: v.string(),
  status: v.union(v.literal("resolved"), v.literal("unresolved"), v.literal("escalated")),
})
  .index("byOrganization", ["organizationId"])
  .index("byContactSession", ["contactSessionId"])
  .index("byThreadId", ["threadId"]);
