import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, Triangle, Line, FabricImage } from "fabric";
import { WhiteboardSidebar } from "./WhiteboardSidebar";
import { ColorPicker } from "./ColorPicker";
import { BrushSizePicker } from "./BrushSizePicker";
import { toast } from "sonner";

export const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "triangle" | "line" | "arrow">("select");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBrushPicker, setShowBrushPicker] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 80,
      height: window.innerHeight - 100,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush safely
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;
    }

    // Handle drawing state
    canvas.on('path:created', () => {
      setIsDrawing(false);
    });

    canvas.on('mouse:down', () => {
      if (canvas.isDrawingMode) {
        setIsDrawing(true);
      }
    });

    canvas.on('mouse:up', () => {
      setIsDrawing(false);
    });

    setFabricCanvas(canvas);

    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth - 80,
        height: window.innerHeight - 100,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    // Don't add shapes when we're currently drawing or manipulating objects
    if (isDrawing || !fabricCanvas) return;
    
    setActiveTool(tool);

    // Only add shapes if we're not in select mode and not currently drawing
    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 100,
        height: 100,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: "transparent",
        radius: 50,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    } else if (tool === "triangle") {
      const triangle = new Triangle({
        left: 100,
        top: 100,
        fill: "transparent",
        width: 100,
        height: 100,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(triangle);
      fabricCanvas.setActiveObject(triangle);
    } else if (tool === "line") {
      const line = new Line([50, 100, 200, 100], {
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(line);
      fabricCanvas.setActiveObject(line);
    } else if (tool === "arrow") {
      const arrow = new Line([50, 100, 200, 100], {
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(arrow);
      fabricCanvas.setActiveObject(arrow);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast("Canvas cleared!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        FabricImage.fromURL(e.target?.result as string, {
          crossOrigin: 'anonymous',
        }).then((img) => {
          // Scale image to fit canvas better
          const scale = Math.min(300 / img.width!, 300 / img.height!);
          img.scale(scale);
          img.set({
            left: 100,
            top: 100,
          });
          fabricCanvas.add(img);
          fabricCanvas.setActiveObject(img);
        });
      };
      imgElement.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUndo = () => {
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
      fabricCanvas.renderAll();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <WhiteboardSidebar
        activeTool={activeTool}
        onToolClick={handleToolClick}
        onClear={handleClear}
        onUndo={handleUndo}
        onImageUpload={handleImageUpload}
        onColorClick={() => setShowColorPicker(true)}
        onBrushClick={() => setShowBrushPicker(true)}
        activeColor={activeColor}
        brushSize={brushSize}
      />
      
      <div className="flex-1 relative">
        <canvas 
          ref={canvasRef} 
          className="border border-border rounded-lg shadow-soft" 
          style={{ margin: '20px' }}
        />
      </div>

      {showColorPicker && (
        <ColorPicker
          color={activeColor}
          onChange={setActiveColor}
          onClose={() => setShowColorPicker(false)}
        />
      )}

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