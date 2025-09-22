import { WhiteboardCanvas } from "@/components/whiteboard/WhiteboardCanvas";
import { WhiteboardSidebar } from "@/components/whiteboard/WhiteboardSidebar";
import { useState } from "react";

export type Tool = "select" | "draw" | "rectangle" | "circle" | "arrow" | "text";

const Whiteboard = () => {
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [activeColor, setActiveColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <WhiteboardSidebar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        activeColor={activeColor}
        onColorChange={setActiveColor}
        brushSize={brushSize}
        onBrushSizeChange={setBrushSize}
      />
      <div className="flex-1">
        <WhiteboardCanvas
          activeTool={activeTool}
          activeColor={activeColor}
          brushSize={brushSize}
        />
      </div>
    </div>
  );
};

export default Whiteboard;