import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Users, Clock, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useOrganization } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Dashboard = () => {
  const { organization, membership } = useOrganization();
  const [whiteboards, setWhiteboards] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  // Load whiteboards for current organization
  useEffect(() => {
    const loadBoards = () => {
      try {
        const allBoardsRaw = localStorage.getItem("user:boards");
        if (!allBoardsRaw) {
          setWhiteboards([]);
          return;
        }
        
        const allBoards = JSON.parse(allBoardsRaw);
        
        // Filter boards by organization ID
        const orgId = organization?.id || "personal";
        const orgBoards = allBoards.filter((b: any) => {
          const boardOrgId = b.organizationId || "personal";
          return boardOrgId === orgId;
        });
        
        setWhiteboards(orgBoards);
      } catch (error) {
        console.error("Error loading boards:", error);
        setWhiteboards([]);
      }
    };

    loadBoards();
    
    // Set up storage event listener for cross-tab updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user:boards") {
        loadBoards();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [organization?.id]);

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

  const handleInviteMember = async () => {
    if (!organization) {
      toast.error("No organization selected");
      return;
    }

    if (!inviteEmail || !inviteEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await organization.inviteMember({
        emailAddress: inviteEmail,
        role: "org:member"
      });
      
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setInviteDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send invitation");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200">
      {/* Local page header (compact) */}
      <header className="border-b border-gray-800/70 bg-[#111111]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
              {organization && (
                <p className="text-sm text-gray-400 mt-0.5">{organization.name}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {organization && membership?.role === "org:admin" && (
                <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2 border-gray-700 text-gray-300 hover:bg-[#1a1a1a]">
                      <UserPlus className="w-4 h-4" />
                      Invite
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1a1a1a] border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-white">Invite Team Member</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Send an invitation to join {organization.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-200">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="colleague@company.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="bg-[#111111] border-gray-700 text-white"
                          onKeyDown={(e) => e.key === "Enter" && handleInviteMember()}
                        />
                      </div>
                      <Button 
                        onClick={handleInviteMember} 
                        className="w-full bg-[#0CF2A0] text-[#111111] hover:bg-[#0CF2A0]/90"
                      >
                        Send Invitation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button onClick={createNewWhiteboard} className="gap-2 bg-[#0CF2A0] text-[#111111] hover:bg-[#0CF2A0]/90">
                <Plus className="w-4 h-4" />
                New Whiteboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold text-white">
              {organization ? `${organization.name}'s Workspace` : "Your Personal Workspace"}
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              {organization 
                ? `Collaborate with ${organization.membersCount} team member${organization.membersCount !== 1 ? 's' : ''} on shared whiteboards`
                : "Create, collaborate, and bring your ideas to life with our powerful whiteboard platform"
              }
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

            {organization && membership?.role === "org:admin" && (
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow border-gray-800 bg-[#141414]"
                onClick={() => setInviteDialogOpen(true)}
              >
                <CardHeader className="text-center py-4">
                  <div className="w-10 h-10 bg-[#0CF2A0]/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <Users className="w-5 h-5 text-[#0CF2A0]" />
                  </div>
                  <CardTitle>Invite Members</CardTitle>
                  <CardDescription>Add team members to collaborate</CardDescription>
                </CardHeader>
              </Card>
            )}

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
            <h3 className="text-lg font-semibold text-white">
              {organization ? "Team Whiteboards" : "Your Whiteboards"}
            </h3>
            {whiteboards.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No whiteboards yet. Create one to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedWhiteboards.map((board) => (
                  <Card 
                    key={board.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow border-gray-800 bg-[#141414]"
                    onClick={() => window.location.href = `/whiteboard/${board.id}`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-white">{board.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(board.lastModified).toLocaleDateString()}
                        </span>
                        {organization && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {organization.membersCount}
                          </span>
                        )}
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
            )}

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