import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Home, Inbox } from "lucide-react";

export const WidgetFooter = () => {
  const screen: "selection" | "inbox" = "selection";
  return (
    <footer className="flex shrink-0 w-full justify-center border-t bg-background">
      <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost">
        <Home className={cn("size-5", screen === "selection" && "text-primary")} />
      </Button>
      <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost">
        <Inbox className={cn("size-5", screen === "inbox" && "text-primary")} />
      </Button>
    </footer>
  );
};
