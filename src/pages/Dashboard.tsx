import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, FileText, Users, ChevronLeft, ChevronRight, UserPlus, Building2 } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useOrganization } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { OrganizationPrompt } from "@/components/onboarding/OrganizationPrompt";
import { WorkspaceBanner } from "@/components/workspace/WorkspaceBanner";
import { EmptyState } from "@/components/dashboard/EmptyState";

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
    <>
      <OrganizationPrompt />
      <div className="min-h-screen bg-[#111111] text-gray-200">
        <header className="border-b border-gray-800/70 bg-[#111111]/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-0.5">
                  {organization ? (
                    <>
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{organization.name}</span>
                      <span>•</span>
                      <Users className="h-3.5 w-3.5" />
                      <span>{organization.membersCount} member{organization.membersCount !== 1 ? 's' : ''}</span>
                    </>
                  ) : (
                    <span>Personal Workspace</span>
                  )}
                </div>
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

        <div className="container mx-auto px-4 py-8 space-y-8">
          <WorkspaceBanner />

          {organization && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1a1a1a] border-gray-800 hover:border-gray-700 transition-all cursor-pointer" onClick={createNewWhiteboard}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Plus className="h-5 w-5 text-[#0CF2A0]" />
                      Create New
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Start a new whiteboard
                    </CardDescription>
                  </CardHeader>
                </Card>

                {membership?.role === "org:admin" && (
                  <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                    <DialogTrigger asChild>
                      <Card className="bg-[#1a1a1a] border-gray-800 hover:border-gray-700 transition-all cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <Users className="h-5 w-5 text-[#0CF2A0]" />
                            Invite Members
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            Add team members
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </DialogTrigger>
                  </Dialog>
                )}

                <Card className="bg-[#1a1a1a] border-gray-800 hover:border-gray-700 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <FileText className="h-5 w-5 text-[#0CF2A0]" />
                      Workspace Info
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {whiteboards.length} whiteboard{whiteboards.length !== 1 ? 's' : ''} • {organization.membersCount} member{organization.membersCount !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>
          )}

          {whiteboards.length === 0 ? (
            <EmptyState hasOrganization={!!organization} />
          ) : (
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-2">
                  {organization ? 'Team Whiteboards' : 'Recent Whiteboards'}
                </h2>
                <p className="text-sm text-gray-400">
                  Showing {paginatedWhiteboards.length} of {whiteboards.length} whiteboards
                  {organization && ` in ${organization.name}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedWhiteboards.map((board) => (
                  <Card 
                    key={board.id}
                    className="bg-[#1a1a1a] border-gray-800 hover:border-[#0CF2A0]/50 transition-all cursor-pointer"
                    onClick={() => window.location.href = `/whiteboard/${board.id}`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-white">
                        <span className="truncate">{board.title}</span>
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        <div className="space-y-1">
                          <div className="text-sm">
                            Modified: {new Date(board.lastModified).toLocaleDateString()}
                          </div>
                          {board.collaborators > 0 && (
                            <div className="flex items-center gap-1 text-xs">
                              <Users className="h-3 w-3" />
                              {board.collaborators} collaborator{board.collaborators !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-700 text-gray-300 hover:bg-[#1a1a1a]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page 
                          ? "bg-[#0CF2A0] text-[#111111] hover:bg-[#0CF2A0]/90" 
                          : "border-gray-700 text-gray-300 hover:bg-[#1a1a1a]"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-700 text-gray-300 hover:bg-[#1a1a1a]"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
