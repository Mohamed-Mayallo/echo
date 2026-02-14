import React, { useEffect } from "react";
import { organizationIdAtom, screenAtom, WidgetScreen } from "../store";
import { WidgetAuth } from "../ui/widget-auth";
import { WidgetFooter } from "../ui/widget-footer";
import { WidgetHeader } from "../ui/widget-header";
import { useAtomValue, useSetAtom } from "jotai";
import { WidgetError } from "../ui/widget-error";
import { WidgetLoading } from "../ui/widget-loading";
import { WidgetChat } from "../ui/widget-chat";
import { WidgetSelection } from "../ui/widget-selection";

const screens: Record<WidgetScreen, React.JSX.Element> = {
  auth: <WidgetAuth />,
  loading: <WidgetLoading />,
  error: <WidgetError />,
  selection: <WidgetSelection />,
  chat: <WidgetChat />,
};

export const WidgetView = ({ organizationId }: { organizationId: string }) => {
  const currentScreen = useAtomValue(screenAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setScreen = useSetAtom(screenAtom);

  useEffect(() => {
    if (!organizationId) {
      setScreen("error");
      return;
    }

    setOrganizationId(organizationId);
  }, [organizationId, setOrganizationId, setScreen]);

  return (
    <main className="flex flex-col min-h-screen min-w-screen">
      <WidgetHeader />

      {screens[currentScreen]}

      <WidgetFooter />
    </main>
  );
};
