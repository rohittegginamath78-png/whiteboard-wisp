import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

export const ColorPicker = ({ color, onChange, onClose }: ColorPickerProps) => {
  const [customColor, setCustomColor] = useState(color);

  const presetColors = [
    "#000000", // Black
    "#FF0000", // Red
    "#00FF00", // Green  
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#800080", // Purple
    "#FFC0CB", // Pink
    "#A52A2A", // Brown
    "#808080", // Gray
    "#FFFFFF", // White
  ];

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    setCustomColor(selectedColor);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <Card className="p-6 bg-card shadow-strong max-w-sm w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Choose Color</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Preset Colors */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Preset Colors
            </label>
            <div className="grid grid-cols-6 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="w-8 h-8 rounded-md border-2 border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorSelect(presetColor)}
                  title={presetColor}
                />
              ))}
            </div>
          </div>

          {/* Custom Color */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Custom Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  onChange(e.target.value);
                }}
                className="w-12 h-8 rounded border border-border cursor-pointer"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  onChange(e.target.value);
                }}
                className="flex-1 px-3 py-1 text-sm border border-border rounded bg-background text-foreground"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="px-6">
            Done
          </Button>
        </div>
      </Card>
    </div>
  );
};