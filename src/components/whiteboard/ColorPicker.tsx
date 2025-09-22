import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

export const ColorPicker = ({ color, onChange, onClose }: ColorPickerProps) => {
  const presetColors = [
    "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#800080",
    "#ffc0cb", "#a52a2a", "#808080", "#008000", "#000080",
    "#800000", "#808000", "#008080", "#c0c0c0", "#ff6347"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <Card className="p-6 w-80 bg-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Color Picker</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Color input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Custom Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-10 rounded border border-border cursor-pointer"
          />
        </div>

        {/* Preset colors */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Preset Colors</label>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => onChange(presetColor)}
                className={`w-10 h-10 rounded border-2 ${
                  color === presetColor ? "border-primary" : "border-border"
                } hover:scale-110 transition-transform`}
                style={{ backgroundColor: presetColor }}
                title={presetColor}
              />
            ))}
          </div>
        </div>

        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </Card>
    </div>
  );
};