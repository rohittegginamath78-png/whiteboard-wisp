import { useState, useEffect } from "react";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Users, Share2, Zap } from "lucide-react";

export const OrganizationPrompt = () => {
  const { organization } = useOrganization();
  const { createOrganization } = useOrganizationList();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Check if user has seen this prompt
    const hasSeenPrompt = localStorage.getItem("onboarding:workspace-prompt-shown");
    
    // Show prompt if user has no organization and hasn't seen it
    if (!organization && !hasSeenPrompt) {
      setIsOpen(true);
    }
  }, [organization]);

  const handleCreateWorkspace = async () => {
    setIsCreating(true);
    try {
      await createOrganization?.({ name: "My Workspace" });
      localStorage.setItem("onboarding:workspace-prompt-shown", "true");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating organization:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding:workspace-prompt-shown", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="h-6 w-6 text-primary" />
            <DialogTitle>Welcome to SketchSpark!</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Create a workspace to collaborate with your team on whiteboards
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Invite unlimited members</h4>
              <p className="text-sm text-muted-foreground">
                Add your team and collaborate together
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Share2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Share all whiteboards</h4>
              <p className="text-sm text-muted-foreground">
                Everyone in the workspace can access all boards
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Real-time collaboration</h4>
              <p className="text-sm text-muted-foreground">
                Work together seamlessly in real-time
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCreateWorkspace}
            disabled={isCreating}
            className="flex-1"
          >
            {isCreating ? "Creating..." : "Create Workspace"}
          </Button>
          <Button onClick={handleSkip} variant="outline">
            Skip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
