import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface BrushSizePickerProps {
  size: number;
  onChange: (size: number) => void;
  onClose: () => void;
}

export const BrushSizePicker = ({ size, onChange, onClose }: BrushSizePickerProps) => {
  const presetSizes = [1, 2, 4, 6, 8, 10, 15, 20, 25, 30];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <Card className="p-6 w-80 bg-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Brush Size</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Size slider */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Size: {size}px
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={size}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Preset sizes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Preset Sizes</label>
          <div className="grid grid-cols-5 gap-2">
            {presetSizes.map((presetSize) => (
              <button
                key={presetSize}
                onClick={() => onChange(presetSize)}
                className={`h-10 rounded border-2 flex items-center justify-center ${
                  size === presetSize ? "border-primary bg-primary/10" : "border-border"
                } hover:bg-muted transition-colors`}
                title={`${presetSize}px`}
              >
                <div
                  className="bg-gray-600 rounded-full"
                  style={{
                    width: Math.min(presetSize, 20),
                    height: Math.min(presetSize, 20),
                  }}
                />
              </button>
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