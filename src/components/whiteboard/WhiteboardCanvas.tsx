import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, Path, Triangle, Line, Image as FabricImage } from "fabric";
import { toast } from "sonner";
import { Tool } from "@/pages/Whiteboard";

interface WhiteboardCanvasProps {
  activeTool: Tool;
  activeColor: string;
  brushSize: number;
  onToolChange: (tool: Tool) => void;
}

export const WhiteboardCanvas = ({ 
  activeTool, 
  activeColor, 
  brushSize,
  onToolChange
}: WhiteboardCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 80, // Account for sidebar
      height: window.innerHeight - 64, // Account for header
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;
    }

    setFabricCanvas(canvas);

    // Handle window resize
    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth - 80,
        height: window.innerHeight - 64,
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

    // Enable selection mode for select tool
    if (activeTool === "select") {
      fabricCanvas.selection = true;
      fabricCanvas.forEachObject((obj) => {
        obj.selectable = true;
      });
    } else if (activeTool !== "draw") {
      fabricCanvas.selection = false;
      fabricCanvas.forEachObject((obj) => {
        obj.selectable = false;
      });
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  // Handle shape creation
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleMouseDown = (options: any) => {
      if (activeTool === "select" || activeTool === "draw") return;
      
      setIsDrawing(true);
      const pointer = fabricCanvas.getPointer(options.e);
      
      let shape;
      
      switch (activeTool) {
        case "rectangle":
          shape = new Rect({
            left: pointer.x,
            top: pointer.y,
            fill: "transparent",
            stroke: activeColor,
            strokeWidth: brushSize,
            width: 100,
            height: 60,
          });
          break;
        case "circle":
          shape = new Circle({
            left: pointer.x,
            top: pointer.y,
            fill: "transparent",
            stroke: activeColor,
            strokeWidth: brushSize,
            radius: 50,
          });
          break;
        case "arrow":
          const arrowLine = new Line([pointer.x, pointer.y, pointer.x + 100, pointer.y], {
            stroke: activeColor,
            strokeWidth: brushSize,
          });
          
          const arrowHead = new Triangle({
            left: pointer.x + 95,
            top: pointer.y - 5,
            fill: activeColor,
            width: 10,
            height: 10,
            angle: 90,
          });
          
          fabricCanvas.add(arrowLine);
          fabricCanvas.add(arrowHead);
          onToolChange("select");
          setIsDrawing(false);
          return;
        default:
          return;
      }

      if (shape) {
        fabricCanvas.add(shape);
        onToolChange("select");
      }
      setIsDrawing(false);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    fabricCanvas.on('mouse:down', handleMouseDown);
    fabricCanvas.on('mouse:up', handleMouseUp);

    return () => {
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('mouse:up', handleMouseUp);
    };
  }, [fabricCanvas, activeTool, activeColor, brushSize, onToolChange]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const fabricImg = new FabricImage(img, {
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        fabricCanvas.add(fabricImg);
        fabricCanvas.renderAll();
        toast("Image added to canvas!");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Add hidden file input for image upload
  useEffect(() => {
    if (activeTool === "image") {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      fileInput.onchange = (e) => handleImageUpload(e as any);
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
      onToolChange("select");
    }
  }, [activeTool, onToolChange]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast("Canvas cleared!");
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="border-none" />
      
      {/* Clear button */}
      <button
        onClick={handleClear}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Clear
      </button>
    </div>
  );
};