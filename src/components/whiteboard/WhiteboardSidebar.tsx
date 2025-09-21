import { 
  MousePointer, 
  Pencil, 
  Square, 
  Circle, 
  Triangle, 
  Minus, 
  ArrowRight, 
  Palette, 
  Brush,
  Trash2,
  Undo,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhiteboardSidebarProps {
  activeTool: string;
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle" | "triangle" | "line" | "arrow") => void;
  onClear: () => void;
  onUndo: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColorClick: () => void;
  onBrushClick: () => void;
  activeColor: string;
  brushSize: number;
}

export const WhiteboardSidebar = ({
  activeTool,
  onToolClick,
  onClear,
  onUndo,
  onImageUpload,
  onColorClick,
  onBrushClick,
  activeColor,
  brushSize,
}: WhiteboardSidebarProps) => {
  const tools = [
    { id: "select" as const, icon: MousePointer, label: "Select" },
    { id: "draw" as const, icon: Pencil, label: "Draw" },
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
    { id: "triangle" as const, icon: Triangle, label: "Triangle" },
    { id: "line" as const, icon: Minus, label: "Line" },
    { id: "arrow" as const, icon: ArrowRight, label: "Arrow" },
  ];

  return (
    <div className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 space-y-2">
      {/* Main Tools */}
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Button
            key={tool.id}
            variant="ghost"
            size="icon"
            className={cn(
              "w-10 h-10 text-sidebar-foreground hover:bg-sidebar-accent",
              activeTool === tool.id && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
            onClick={() => onToolClick(tool.id)}
            title={tool.label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}

      <div className="w-8 h-px bg-sidebar-border my-2" />

      {/* Color Picker */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-sidebar-foreground hover:bg-sidebar-accent relative"
        onClick={onColorClick}
        title="Color Picker"
      >
        <Palette className="h-4 w-4" />
        <div 
          className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-sidebar-border"
          style={{ backgroundColor: activeColor }}
        />
      </Button>

      {/* Brush Size */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-sidebar-foreground hover:bg-sidebar-accent relative"
        onClick={onBrushClick}
        title="Brush Size"
      >
        <Brush className="h-4 w-4" />
        <div className="absolute bottom-0 right-0 text-xs bg-sidebar-accent rounded px-1">
          {brushSize}
        </div>
      </Button>

      <div className="w-8 h-px bg-sidebar-border my-2" />

      {/* Image Upload */}
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 text-sidebar-foreground hover:bg-sidebar-accent"
          title="Upload Image"
          asChild
        >
          <span>
            <Image className="h-4 w-4" />
          </span>
        </Button>
      </label>

      {/* Undo */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-sidebar-foreground hover:bg-sidebar-accent"
        onClick={onUndo}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>

      {/* Clear */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-destructive"
        onClick={onClear}
        title="Clear Canvas"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};