import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface BrushSizePickerProps {
  size: number;
  onChange: (size: number) => void;
  onClose: () => void;
}

export const BrushSizePicker = ({ size, onChange, onClose }: BrushSizePickerProps) => {
  const presetSizes = [1, 2, 5, 10, 15, 20, 30, 50];

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <Card className="p-6 bg-card shadow-strong max-w-sm w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Brush Size</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Current Size Preview */}
          <div className="flex items-center justify-center">
            <div
              className="bg-foreground rounded-full"
              style={{ width: size * 2, height: size * 2, minWidth: 4, minHeight: 4 }}
            />
            <span className="ml-3 text-sm font-medium text-card-foreground">
              {size}px
            </span>
          </div>

          {/* Slider */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-3 block">
              Size
            </label>
            <Slider
              value={[size]}
              onValueChange={(value) => onChange(value[0])}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Preset Sizes */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Quick Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {presetSizes.map((presetSize) => (
                <Button
                  key={presetSize}
                  variant={size === presetSize ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChange(presetSize)}
                  className="h-8 px-3 text-xs"
                >
                  {presetSize}px
                </Button>
              ))}
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