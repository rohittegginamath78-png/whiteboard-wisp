import { SignInButton, SignUpButton, UserButton, useUser, OrganizationSwitcher } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const AuthButtons = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="animate-pulse bg-muted rounded-md h-9 w-20"></div>;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox: "flex items-center gap-2",
              organizationSwitcherTrigger: "px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-sm border border-border transition-colors data-[organization-switcher-trigger]:cursor-pointer",
              organizationPreviewAvatarBox: "w-6 h-6",
              organizationSwitcherTriggerIcon: "text-muted-foreground",
            }
          }}
          afterCreateOrganizationUrl="/dashboard"
          afterSelectOrganizationUrl="/dashboard"
          createOrganizationMode="modal"
          hidePersonal={false}
        />
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button size="sm" className="gradient-primary text-white border-0">
          Sign Up
        </Button>
      </SignUpButton>
    </div>
  );
};