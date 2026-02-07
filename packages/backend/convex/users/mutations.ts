import { mutation } from "../_generated/server";

export const addUser = mutation({
  handler: async (ctx) => {
    const userId = await ctx.db.insert("users", {
      name: "Hello",
    });

    return userId;
  },
});
