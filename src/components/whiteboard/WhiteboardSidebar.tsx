import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  MousePointer, 
  Pen, 
  Square, 
  Circle, 
  ArrowRight, 
  Type, 
  Image as ImageIcon,
  Palette,
  Settings
} from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { BrushSizePicker } from "./BrushSizePicker";
import type { Tool } from "@/pages/Whiteboard";

interface WhiteboardSidebarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  activeColor: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export const WhiteboardSidebar = ({
  activeTool,
  onToolChange,
  activeColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
}: WhiteboardSidebarProps) => {
  const tools = [
    { id: "select" as Tool, icon: MousePointer, label: "Select" },
    { id: "draw" as Tool, icon: Pen, label: "Draw" },
    { id: "rectangle" as Tool, icon: Square, label: "Rectangle" },
    { id: "circle" as Tool, icon: Circle, label: "Circle" },
    { id: "arrow" as Tool, icon: ArrowRight, label: "Arrow" },
    { id: "text" as Tool, icon: Type, label: "Text" },
  ];

  const handleImageUpload = () => {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 space-y-2">
      {/* Tools */}
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={activeTool === tool.id ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolChange(tool.id)}
          className="w-12 h-12"
          title={tool.label}
        >
          <tool.icon className="w-5 h-5" />
        </Button>
      ))}

      {/* Divider */}
      <div className="w-8 h-px bg-border my-2" />

      {/* Image Upload */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleImageUpload}
        className="w-12 h-12"
        title="Upload Image"
      >
        <ImageIcon className="w-5 h-5" />
      </Button>

      {/* Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12"
            title="Color"
          >
            <div className="relative">
              <Palette className="w-5 h-5" />
              <div 
                className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background"
                style={{ backgroundColor: activeColor }}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-auto p-2">
          <ColorPicker color={activeColor} onChange={onColorChange} />
        </PopoverContent>
      </Popover>

      {/* Brush Size Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12"
            title="Brush Size"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-auto p-2">
          <BrushSizePicker size={brushSize} onChange={onBrushSizeChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};