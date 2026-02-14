import { AlertCircle } from "lucide-react";
import { screenAtom, sessionErrorAtom } from "../store";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@workspace/ui/components/button";

export const WidgetError = () => {
  const errorMessage = useAtomValue(sessionErrorAtom);
  const setScreen = useSetAtom(screenAtom);

  return (
    <div className="flex flex-col grow justify-center items-center gap-4 p-4 bg-error text-whitew-full h-full">
      <AlertCircle className="size-12" />

      <p className="max-w-md text-center">
        {errorMessage ?? "Something went wrong. Please try again later."}
      </p>

      <Button variant="outline" size="lg" onClick={() => setScreen("auth")}>
        Back
      </Button>
    </div>
  );
};
