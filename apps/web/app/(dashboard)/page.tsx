"use client";

import { useQuery, useMutation } from "convex/react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { api } from "@workspace/backend/_generated/api";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.queries.getUsers);
  const add = useMutation(api.users.mutations.addUser);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello Web</h1>
        <div className="flex gap-2">
          <UserButton />
          <OrganizationSwitcher hidePersonal />
          <Button onClick={() => add()}>Create user</Button>
          <Input type="text" placeholder="Input" />
          <p>{users ? JSON.stringify(users) : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}
