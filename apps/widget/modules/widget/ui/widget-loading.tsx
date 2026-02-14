"use client";

import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  organizationIdAtom,
  screenAtom,
  sessionErrorAtom,
  sessionIdAtomFamily,
  sessionLoadingMessageAtom,
} from "../store";
import { Loader } from "lucide-react";

export const WidgetLoading = () => {
  const organizationId = useAtomValue(organizationIdAtom)!;
  const setScreen = useSetAtom(screenAtom);
  const setSessionErrorAtom = useSetAtom(sessionErrorAtom);
  const setLoadingMessage = useSetAtom(sessionLoadingMessageAtom);
  const loadingMessage = useAtomValue(sessionLoadingMessageAtom);
  const contactSessionId = useAtomValue(sessionIdAtomFamily(organizationId))!;
  const [step, setStep] = useState<"org" | "session" | "done">("org");
  const [isValidSession, setIsValidSession] = useState(false);
  const [isValidOrganization, setIsValidOrganization] = useState(false);

  const validateOrganization = useAction(api.organizations.actions.validateOrganization);

  useEffect(() => {
    if (step !== "org") {
      return;
    }

    if (!organizationId) {
      return;
    }

    setLoadingMessage("Validating organization...");

    validateOrganization({ organizationId })
      .then(({ valid }) => {
        if (!valid) {
          setScreen("error");
          setSessionErrorAtom("Invalid organization ID");
          return;
        }

        setLoadingMessage("Validated!");
        setIsValidOrganization(true);
        setStep("session");
      })
      .catch((e) => {
        setSessionErrorAtom(e.data);
        setScreen("error");
        setStep("done");
      })
      .finally(() => {
        setLoadingMessage(null);
      });
  }, [
    organizationId,
    validateOrganization,
    setScreen,
    setSessionErrorAtom,
    setLoadingMessage,
    step,
    setStep,
  ]);

  const validateSession = useQuery(
    api.contactSessions.queries.validateContactSession,
    contactSessionId ? { contactSessionId } : "skip",
  );

  useEffect(() => {
    if (step !== "session") {
      return;
    }

    if (!validateSession) {
      setScreen("auth");
      return;
    }

    setLoadingMessage("Validating session...");

    if (!validateSession.valid) {
      setScreen("error");
      setLoadingMessage(null);
      setSessionErrorAtom("Invalid Session");
      setStep("done");
      return;
    }

    setLoadingMessage("Validated!");
    setIsValidSession(true);
    setStep("done");
  }, [validateSession, setScreen, setSessionErrorAtom, setLoadingMessage, step, setStep]);

  useEffect(() => {
    if (step !== "done") {
      return;
    }

    if (!isValidSession || !isValidOrganization) {
      setScreen("auth");
      return;
    }

    setScreen("selection");
  }, [isValidSession, isValidOrganization, setScreen, step, setStep]);

  return (
    <div className="flex flex-col grow justify-center items-center gap-4 p-4 bg-error text-white w-full h-full">
      <Loader className="size-12 animate-spin" />

      <p className="max-w-md text-center">{loadingMessage ?? "Loading ..."}</p>
    </div>
  );
};
