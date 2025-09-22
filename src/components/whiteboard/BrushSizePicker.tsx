import { Slider } from "@/components/ui/slider";

interface BrushSizePickerProps {
  size: number;
  onChange: (size: number) => void;
}

export const BrushSizePicker = ({ size, onChange }: BrushSizePickerProps) => {
  return (
    <div className="space-y-3 w-48">
      <div className="text-sm font-medium">Brush Size</div>
      <div className="space-y-4">
        <Slider
          value={[size]}
          onValueChange={(value) => onChange(value[0])}
          max={20}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>1px</span>
          <span className="font-medium">{size}px</span>
          <span>20px</span>
        </div>
        <div className="flex justify-center">
          <div 
            className="rounded-full bg-foreground"
            style={{ 
              width: `${Math.max(size, 2)}px`, 
              height: `${Math.max(size, 2)}px` 
            }}
          />
        </div>
      </div>
    </div>
  );
};