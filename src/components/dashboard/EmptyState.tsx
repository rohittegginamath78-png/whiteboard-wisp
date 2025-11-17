import { useNavigate } from "react-router-dom";
import { useOrganization } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Rocket, Plus } from "lucide-react";

interface EmptyStateProps {
  hasOrganization: boolean;
}

export const EmptyState = ({ hasOrganization }: EmptyStateProps) => {
  const navigate = useNavigate();
  const { organization } = useOrganization();

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {hasOrganization ? "No whiteboards yet" : "Welcome to SketchSpark"}
        </h2>
        <p className="text-muted-foreground max-w-md">
          {hasOrganization
            ? "Create your first whiteboard to start collaborating with your team"
            : "Create a whiteboard to get started with your visual ideas"}
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <Button onClick={() => navigate("/whiteboard/new")} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Create Whiteboard
        </Button>
        {!hasOrganization && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              document.querySelector<HTMLButtonElement>('[data-organization-switcher-trigger]')?.click();
            }}
          >
            <Users className="mr-2 h-5 w-5" />
            Create Workspace
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Rocket className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Quick Start</h3>
              <p className="text-sm text-muted-foreground">
                Create a whiteboard and start sketching your ideas instantly
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Collaborate</h3>
              <p className="text-sm text-muted-foreground">
                Create a workspace and invite team members to collaborate
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Organize</h3>
              <p className="text-sm text-muted-foreground">
                Keep all your whiteboards organized in one place
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
