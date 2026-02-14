import { defineSchema } from "convex/server";
import { users } from "./schema/users";
import { contactSessions } from "./schema/contactSessions";

export default defineSchema({
  users,
  contactSessions,
});
