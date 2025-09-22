import { Button } from "@/components/ui/button";
import { 
  MousePointer2, 
  Pencil, 
  Square, 
  Circle, 
  ArrowRight, 
  Type, 
  Image as ImageIcon, 
  Palette,
  Brush
} from "lucide-react";
import { Tool } from "@/pages/Whiteboard";

interface WhiteboardSidebarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onShowColorPicker: () => void;
  onShowBrushPicker: () => void;
}

export const WhiteboardSidebar = ({
  activeTool,
  onToolChange,
  onShowColorPicker,
  onShowBrushPicker,
}: WhiteboardSidebarProps) => {
  const tools = [
    { id: "select" as Tool, icon: MousePointer2, label: "Select" },
    { id: "draw" as Tool, icon: Pencil, label: "Draw" },
    { id: "rectangle" as Tool, icon: Square, label: "Rectangle" },
    { id: "circle" as Tool, icon: Circle, label: "Circle" },
    { id: "arrow" as Tool, icon: ArrowRight, label: "Arrow" },
    { id: "text" as Tool, icon: Type, label: "Text" },
    { id: "image" as Tool, icon: ImageIcon, label: "Image" },
  ];

  return (
    <div className="w-20 bg-white border-r border-border flex flex-col items-center py-6 gap-4 z-40">
      {/* Tools */}
      <div className="flex flex-col gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "ghost"}
              size="icon"
              onClick={() => onToolChange(tool.id)}
              className="w-12 h-12 rounded-lg"
              title={tool.label}
            >
              <Icon className="w-5 h-5" />
            </Button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-border my-2" />

      {/* Color and Brush Settings */}
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onShowColorPicker}
          className="w-12 h-12 rounded-lg"
          title="Color"
        >
          <Palette className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onShowBrushPicker}
          className="w-12 h-12 rounded-lg"
          title="Brush Size"
        >
          <Brush className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};