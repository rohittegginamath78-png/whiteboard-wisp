import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WhiteboardCanvas } from "@/components/whiteboard/WhiteboardCanvas";
import { WhiteboardSidebar } from "@/components/whiteboard/WhiteboardSidebar";
import { ColorPicker } from "@/components/whiteboard/ColorPicker";
import { BrushSizePicker } from "@/components/whiteboard/BrushSizePicker";

export type Tool = "select" | "draw" | "rectangle" | "circle" | "arrow" | "text" | "image";

const Whiteboard = () => {
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [activeColor, setActiveColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBrushPicker, setShowBrushPicker] = useState(false);

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 h-16 bg-white border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDashboard}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <span className="font-medium text-foreground">Untitled Whiteboard</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Share
          </Button>
          <Button size="sm">
            Save
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <WhiteboardSidebar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        onShowColorPicker={() => setShowColorPicker(true)}
        onShowBrushPicker={() => setShowBrushPicker(true)}
      />

      {/* Canvas */}
      <div className="flex-1 pt-16">
        <WhiteboardCanvas
          activeTool={activeTool}
          activeColor={activeColor}
          brushSize={brushSize}
          onToolChange={setActiveTool}
        />
      </div>

      {/* Color Picker Popup */}
      {showColorPicker && (
        <ColorPicker
          color={activeColor}
          onChange={setActiveColor}
          onClose={() => setShowColorPicker(false)}
        />
      )}

      {/* Brush Size Picker Popup */}
      {showBrushPicker && (
        <BrushSizePicker
          size={brushSize}
          onChange={setBrushSize}
          onClose={() => setShowBrushPicker(false)}
        />
      )}
    </div>
  );
};

export default Whiteboard;