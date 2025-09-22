interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const colors = [
    "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#800080",
    "#ffc0cb", "#a52a2a", "#808080", "#000080", "#008000",
    "#ff69b4", "#40e0d0", "#ee82ee", "#90ee90", "#f0e68c"
  ];

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Color</div>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((c) => (
          <button
            key={c}
            className={`w-8 h-8 rounded-lg border-2 transition-all ${
              color === c 
                ? "border-primary scale-110" 
                : "border-border hover:border-muted-foreground"
            }`}
            style={{ backgroundColor: c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 rounded-lg border border-border cursor-pointer"
        />
      </div>
    </div>
  );
};