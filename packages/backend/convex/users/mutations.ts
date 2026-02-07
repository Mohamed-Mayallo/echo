import { mutation } from "../_generated/server";

export const addUser = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const userId = await ctx.db.insert("users", {
      name: "Hello",
    });

    return userId;
  },
});
