import React from 'react';
import { Color } from '../types/cube';

interface ColorPickerProps {
  selectedColor: Color;
  onColorSelect: (color: Color) => void;
  isVisible: boolean;
}

const COLORS: { color: Color; name: string; hex: string }[] = [
  { color: 'W', name: 'White', hex: '#FFFFFF' },
  { color: 'R', name: 'Red', hex: '#FF0000' },
  { color: 'G', name: 'Green', hex: '#00FF00' },
  { color: 'Y', name: 'Yellow', hex: '#FFFF00' },
  { color: 'O', name: 'Orange', hex: '#FF8000' },
  { color: 'B', name: 'Blue', hex: '#0000FF' }
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  selectedColor, 
  onColorSelect, 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Picker</h3>
      <p className="text-sm text-gray-600 mb-4">Click a color, then click a sticker to change it</p>
      
      <div className="grid grid-cols-3 gap-3">
        {COLORS.map(({ color, name, hex }) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`
              p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105
              ${selectedColor === color 
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            style={{ backgroundColor: hex }}
            title={name}
          >
            <div className="w-8 h-8 rounded" style={{ backgroundColor: hex }} />
            <span className="block mt-1 text-xs font-medium text-gray-700">{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
