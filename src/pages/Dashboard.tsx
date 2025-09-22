import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const Dashboard = () => {
  const [whiteboards] = useState(
    Array.from({ length: 18 }).map((_, i) => ({
      id: i + 1,
      title: [
        "Project Planning",
        "Design Wireframes",
        "Marketing Strategy",
        "Sprint Retro",
        "UX Research Notes",
        "Product Roadmap",
      ][i % 6] + ` ${i + 1}`,
      lastModified: ["2 hours ago", "1 day ago", "3 days ago"][i % 3],
      collaborators: (i % 5) + 1,
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = useMemo(() => Math.max(1, Math.ceil(whiteboards.length / pageSize)), [whiteboards.length]);
  const paginatedWhiteboards = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return whiteboards.slice(start, start + pageSize);
  }, [currentPage, whiteboards]);

  const createNewWhiteboard = () => {
    window.location.href = '/whiteboard/new';
  };

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200">
      {/* Local page header (compact) */}
      <header className="border-b border-gray-800/70 bg-[#111111]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <Button onClick={createNewWhiteboard} className="gap-2 bg-[#0CF2A0] text-[#111111] hover:bg-[#0CF2A0]/90">
              <Plus className="w-4 h-4" />
              New Whiteboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold text-white">
              Create and collaborate on
              <span className="text-[#0CF2A0] block mt-1">Ideas</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Create, collaborate, and bring your ideas to life with our powerful whiteboard
              platform. Perfect for teams, educators, and creative professionals.
            </p>
            <div className="flex justify-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="text-[#0CF2A0]">PERFECT FOR</span>
              </span>
            </div>
            <div className="flex justify-center gap-4 text-sm text-gray-400">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-gray-800 bg-[#141414]" onClick={createNewWhiteboard}>
              <CardHeader className="text-center py-4">
                <div className="w-10 h-10 bg-[#0CF2A0]/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Plus className="w-5 h-5 text-[#0CF2A0]" />
                </div>
                <CardTitle>Create New</CardTitle>
                <CardDescription>Start a new whiteboard project</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow border-gray-800 bg-[#141414]">
              <CardHeader className="text-center py-4">
                <div className="w-10 h-10 bg-[#0CF2A0]/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Users className="w-5 h-5 text-[#0CF2A0]" />
                </div>
                <CardTitle>Join Team</CardTitle>
                <CardDescription>Collaborate with your team</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow border-gray-800 bg-[#141414]">
              <CardHeader className="text-center py-4">
                <div className="w-10 h-10 bg-[#0CF2A0]/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <FileText className="w-5 h-5 text-[#0CF2A0]" />
                </div>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Start with a template</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Whiteboards */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Recent Whiteboards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedWhiteboards.map((board) => (
                <Card key={board.id} className="cursor-pointer hover:shadow-md transition-shadow border-gray-800 bg-[#141414]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-white">{board.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-gray-400">
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
                    <div className="w-full h-28 bg-[#1f1f1f] rounded-md flex items-center justify-center border border-gray-800">
                      <FileText className="w-7 h-7 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-[#1a1a1a]"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  return (
                    <Button
                      key={page}
                      variant={isActive ? "default" : "outline"}
                      className={isActive ? "bg-[#0CF2A0] text-[#111111] hover:bg-[#0CF2A0]/90" : "border-gray-700 text-gray-300 hover:bg-[#1a1a1a]"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-[#1a1a1a]"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;