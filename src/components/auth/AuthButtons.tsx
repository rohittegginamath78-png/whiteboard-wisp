import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const AuthButtons = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="animate-pulse bg-muted rounded-md h-9 w-20"></div>;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
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
      <SignInButton>
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton>
        <Button size="sm" className="gradient-primary text-white border-0">
          Sign Up
        </Button>
      </SignUpButton>
    </div>
  );
};