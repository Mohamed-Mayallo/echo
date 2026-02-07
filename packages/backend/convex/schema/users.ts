import { v } from "convex/values";
import { defineTable } from "convex/server";

export const users = defineTable({
  name: v.string(),
});
