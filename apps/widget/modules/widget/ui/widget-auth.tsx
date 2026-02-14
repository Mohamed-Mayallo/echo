import * as z from "zod";
import { Input } from "@workspace/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@workspace/ui/components/button";
import { FieldGroup, Field, FieldLabel, FieldError } from "@workspace/ui/components/field";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { organizationIdAtom, screenAtom, sessionErrorAtom, sessionIdAtomFamily } from "../store";
import { Doc } from "@workspace/backend/_generated/dataModel";

const formSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z
    .string()
    .email("Invalid email address.")
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
});

export const WidgetAuth = () => {
  const [loading, setLoading] = useState(false);
  const organizationId = useAtomValue(organizationIdAtom)!;
  const setSessionId = useSetAtom(sessionIdAtomFamily(organizationId));
  const setScreen = useSetAtom(screenAtom);
  const setSessionErrorAtom = useSetAtom(sessionErrorAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const createSession = useAction(api.contactSessions.actions.createContactSession);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const metadata: Doc<"contactSessions">["metadata"] = {
        userAgent: window.navigator.userAgent,
        referrer: document.referrer,
      };

      const sessionId = await createSession({
        organizationId,
        name: data.name,
        email: data.email,
        metadata,
      });

      setSessionId(sessionId);
      setScreen("loading");
    } catch (e: any) {
      setSessionErrorAtom(e.data);
      setScreen("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 w-full">
      <form
        className="w-full p-4 flex flex-col gap-2"
        id="auth-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input {...field} id="name" aria-invalid={fieldState.invalid} autoComplete="off" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" form="auth-form" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};
