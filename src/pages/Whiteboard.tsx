import { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useOrganization } from "@clerk/clerk-react";
import "@/styles/whiteboard-theme.css";
import { Building2, Users } from "lucide-react";

export type Tool = "select" | "draw" | "rectangle" | "circle" | "arrow" | "text";

const Whiteboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const { organization } = useOrganization();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      const newId = (globalThis.crypto && 'randomUUID' in globalThis.crypto)
        ? (globalThis.crypto as any).randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      navigate(`/whiteboard/${newId}`, { replace: true });
      return;
    }
    const storageKey = `wb:${id}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setInitialData(JSON.parse(saved));
      else setInitialData({ appState: { currentItemStrokeColor: "#0CF2A0", currentItemBackgroundColor: "#0CF2A0" } });
    } catch {}
  }, [id, navigate]);

  const handleChange = (
    elements: readonly any[],
    appState: any,
    files: any
  ) => {
    try {
      const payload = JSON.stringify({ elements, appState, files });
      const storageKey = id ? `wb:${id}` : "wb:new";
      localStorage.setItem(storageKey, payload);

      const boardsRaw = localStorage.getItem("user:boards");
      const boards = boardsRaw ? JSON.parse(boardsRaw) : [];
      const boardId = id || "new";
      const title = (elements as any[])?.find((e: any) => e.type === "text" && (e as any).text)?.text || "Untitled";
      const orgId = organization?.id || "personal";
      
      const updated = [
        { 
          id: boardId, 
          title, 
          lastModified: new Date().toISOString(), 
          collaborators: organization?.membersCount || 1,
          organizationId: orgId,
          organizationName: organization?.name || "Personal"
        },
        ...boards.filter((b: any) => b.id !== boardId),
      ].slice(0, 200);
      localStorage.setItem("user:boards", JSON.stringify(updated));
    } catch {}
  };

  const handleNew = () => {
    navigate("/whiteboard/new");
  };

  return (
    <div className="h-screen w-screen bg-[#111111] text-gray-200 flex flex-col sketchspark">
      <div className="h-12 w-full bg-[#0f0f0f] border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#0CF2A0]/15 grid place-items-center">
              <div className="w-3.5 h-3.5 bg-[#0CF2A0] rounded-[3px]"></div>
            </div>
            <span className="text-sm font-semibold text-white">SketchSpark</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {organization ? (
              <>
                <Building2 className="h-3.5 w-3.5" />
                <span>{organization.name}</span>
                {organization.membersCount > 1 && (
                  <>
                    <span>•</span>
                    <Users className="h-3.5 w-3.5" />
                    <span>{organization.membersCount} members</span>
                  </>
                )}
              </>
            ) : (
              <span>Personal Workspace</span>
            )}
          </div>
        </div>
        <div className="text-xs text-gray-300">Welcome{user?.fullName ? ", " : ""}{user?.fullName ?? user?.username ?? "Guest"}!</div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Excalidraw
        initialData={initialData ?? undefined}
        onChange={(elements, appState, files) => handleChange(elements, appState, files)}
        theme="dark"
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: true,
            export: { saveFileToDisk: false },
            changeViewBackgroundColor: false,
          },
        }}
        >
        <WelcomeScreen>
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.Item onSelect={handleNew}>New board</MainMenu.Item>
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        </Excalidraw>
      </div>
    </div>
  );
};

export default Whiteboard;