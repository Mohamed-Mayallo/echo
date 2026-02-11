import { WidgetFooter } from "./widget-footer";
import { WidgetHeader } from "./widget-header";

export const WidgetView = ({ organizationId }: { organizationId: string }) => {
  return (
    <main className="flex flex-col min-h-screen min-w-screen">
      <WidgetHeader />

      <div className="flex grow">Content!</div>

      <WidgetFooter />
    </main>
  );
};
