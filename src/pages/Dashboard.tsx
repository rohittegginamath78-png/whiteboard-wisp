import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, Users } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Header } from "@/components/Header";

const Dashboard = () => {
  const { user } = useUser();
  const [whiteboards] = useState([
    { id: 1, title: "Untitled Board 1", createdAt: "2 days ago" },
    { id: 2, title: "Untitled Board 2", createdAt: "2 days ago" },
    { id: 3, title: "Untitled Board 3", createdAt: "2 days ago" },
  ]);

  const handleNewWhiteboard = () => {
    window.location.href = '/whiteboard';
  };

  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: '#222222' }}>
      <Header />
      <div className="pt-20 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Your Whiteboards
            </h1>
            <p className="text-gray-400 text-lg">
              Create and manage your collaborative whiteboards
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Button
              onClick={handleNewWhiteboard}
              className="h-20 text-lg font-semibold flex items-center justify-center gap-3 gradient-primary text-white hover:opacity-90 transition-opacity"
              style={{ 
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                border: 'none'
              }}
            >
              <Plus className="w-6 h-6" />
              New Whiteboard
            </Button>
            
            <Card className="h-20 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
              <div className="h-full flex items-center justify-center gap-3 text-gray-300 hover:text-white">
                <FileText className="w-6 h-6" />
                <span className="text-lg font-medium">From Template</span>
              </div>
            </Card>
            
            <Card className="h-20 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
              <div className="h-full flex items-center justify-center gap-3 text-gray-300 hover:text-white">
                <Users className="w-6 h-6" />
                <span className="text-lg font-medium">Join Board</span>
              </div>
            </Card>
          </div>

          {/* Recent Whiteboards */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Whiteboards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whiteboards.map((board) => (
                <Card 
                  key={board.id} 
                  className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer group"
                  onClick={handleNewWhiteboard}
                >
                  <div className="p-6">
                    {/* Board Preview */}
                    <div className="aspect-video bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 text-white opacity-50">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="3" fill="currentColor"/>
                          <circle cx="12" cy="5" r="1" fill="currentColor"/>
                          <circle cx="12" cy="19" r="1" fill="currentColor"/>
                          <circle cx="5" cy="12" r="1" fill="currentColor"/>
                          <circle cx="19" cy="12" r="1" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Board Info */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {board.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Created {board.createdAt}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;