import { defineSchema } from "convex/server";
import { users } from "./schema/users";
import { contactSessions } from "./schema/contactSessions";
import { conversations } from "./schema/conversations";

export default defineSchema({
  users,
  contactSessions,
  conversations,
});
