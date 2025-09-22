import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Users, Clock } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [whiteboards] = useState([
    { id: 1, title: "Project Planning", lastModified: "2 hours ago", collaborators: 3 },
    { id: 2, title: "Design Wireframes", lastModified: "1 day ago", collaborators: 2 },
    { id: 3, title: "Marketing Strategy", lastModified: "3 days ago", collaborators: 5 },
  ]);

  const createNewWhiteboard = () => {
    window.location.href = '/whiteboard/new';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            </div>
            <Button onClick={createNewWhiteboard} className="gap-2">
              <Plus className="w-4 h-4" />
              New Whiteboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Create and collaborate on
              <span className="text-primary block mt-2">Ideas</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create, collaborate, and bring your ideas to life with our powerful whiteboard
              platform. Perfect for teams, educators, and creative professionals.
            </p>
            <div className="flex justify-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="text-primary">PERFECT FOR</span>
              </span>
            </div>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>Brainstorming</span>
              <span>•</span>
              <span>Wireframing</span>
              <span>•</span>
              <span>Mind Mapping</span>
              <span>•</span>
              <span>Team Collaboration</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={createNewWhiteboard}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Create New</CardTitle>
                <CardDescription>Start a new whiteboard project</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Join Team</CardTitle>
                <CardDescription>Collaborate with your team</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Start with a template</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Whiteboards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Recent Whiteboards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whiteboards.map((board) => (
                <Card key={board.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{board.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {board.lastModified}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {board.collaborators}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;