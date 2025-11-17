import { useState, useEffect } from "react";
import { useOrganization } from "@clerk/clerk-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, Info, Users } from "lucide-react";

export const WorkspaceBanner = () => {
  const { organization } = useOrganization();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("onboarding:banner-dismissed");
    // Show banner only in personal mode and if not dismissed
    if (!organization && !dismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [organization]);

  const handleDismiss = () => {
    localStorage.setItem("onboarding:banner-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Alert className="relative mb-6 border-primary/20 bg-primary/5">
      <Info className="h-4 w-4 text-primary" />
      <AlertDescription className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-sm">
            <strong>Personal Mode:</strong> You're working in your personal workspace.
          </span>
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-primary"
            onClick={() => {
              // This will trigger the organization creation flow
              document.querySelector<HTMLButtonElement>('[data-organization-switcher-trigger]')?.click();
            }}
          >
            Create a workspace
          </Button>
          <span className="text-sm text-muted-foreground">to invite collaborators</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
