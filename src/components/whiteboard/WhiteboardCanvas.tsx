import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, FabricText, Path, FabricImage } from "fabric";
import { toast } from "sonner";
import type { Tool } from "@/pages/Whiteboard";

interface WhiteboardCanvasProps {
  activeTool: Tool;
  activeColor: string;
  brushSize: number;
}

export const WhiteboardCanvas = ({ activeTool, activeColor, brushSize }: WhiteboardCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 64, // Subtract sidebar width
      height: window.innerHeight,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);

    // Handle window resize
    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth - 64,
        height: window.innerHeight,
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

    // Configure canvas based on active tool
    if (activeTool === "draw") {
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.selection = false;
      if (fabricCanvas.freeDrawingBrush) {
        fabricCanvas.freeDrawingBrush.color = activeColor;
        fabricCanvas.freeDrawingBrush.width = brushSize;
      }
    } else {
      fabricCanvas.isDrawingMode = false;
      fabricCanvas.selection = activeTool === "select";
    }

    // Handle mouse events for shape creation
    const handleMouseDown = (e: any) => {
      if (activeTool === "draw" || activeTool === "select") return;
      
      setIsDrawing(true);
      const pointer = fabricCanvas.getPointer(e.e);
      
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
            height: 100,
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
        case "text":
          shape = new FabricText("Type here", {
            left: pointer.x,
            top: pointer.y,
            fill: activeColor,
            fontSize: 20,
          });
          break;
        case "arrow":
          // Create a simple arrow using a path
          const arrowPath = `M ${pointer.x} ${pointer.y} L ${pointer.x + 100} ${pointer.y} M ${pointer.x + 90} ${pointer.y - 10} L ${pointer.x + 100} ${pointer.y} L ${pointer.x + 90} ${pointer.y + 10}`;
          shape = new Path(arrowPath, {
            fill: "",
            stroke: activeColor,
            strokeWidth: brushSize,
          });
          break;
      }
      
      if (shape) {
        fabricCanvas.add(shape);
        fabricCanvas.setActiveObject(shape);
        fabricCanvas.renderAll();
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    // Add event listeners only for shape tools
    if (activeTool !== "draw" && activeTool !== "select") {
      fabricCanvas.on('mouse:down', handleMouseDown);
      fabricCanvas.on('mouse:up', handleMouseUp);
    }

    return () => {
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('mouse:up', handleMouseUp);
    };
  }, [activeTool, activeColor, brushSize, fabricCanvas, isDrawing]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string;
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
      img.src = imgUrl;
    };
    reader.readAsDataURL(file);
  };

  const clearCanvas = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast("Canvas cleared!");
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="border-l border-border" />
      
      {/* Hidden file input for image upload */}
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      {/* Clear button */}
      <button
        onClick={clearCanvas}
        className="absolute top-4 right-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
      >
        Clear Canvas
      </button>
    </div>
  );
};