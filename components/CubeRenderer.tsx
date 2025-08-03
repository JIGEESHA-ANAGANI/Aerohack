import React from 'react';
import { CubeState, Color } from '../types/cube';

interface CubeRendererProps {
  cubeState: CubeState;
  stickerSize: number;
  onStickerClick?: (face: string, row: number, col: number) => void;
  editMode?: boolean;
}

const COLOR_MAP: { [key in Color]: string } = {
  W: '#FFFFFF',
  R: '#FF0000',
  G: '#00FF00',
  Y: '#FFFF00',
  O: '#FF8000',
  B: '#0000FF'
};

export const CubeRenderer: React.FC<CubeRendererProps> = ({ 
  cubeState, 
  stickerSize, 
  onStickerClick, 
  editMode = false 
}) => {
  const gap = 2;
  const faceSize = stickerSize * 3 + gap * 2;

  const renderFace = (face: keyof CubeState, x: number, y: number, label: string) => {
    const faceColors = cubeState[face];
    
    return (
      <g key={face}>
        {/* Face background */}
        <rect 
          x={x} 
          y={y} 
          width={faceSize} 
          height={faceSize} 
          fill="#333" 
          stroke="#000" 
          strokeWidth="1"
        />
        
        {/* Face label */}
        <text 
          x={x + faceSize / 2} 
          y={y - 5} 
          textAnchor="middle" 
          fill="#333" 
          fontSize="14" 
          fontWeight="bold"
        >
          {label}
        </text>
        
        {/* Stickers */}
        {faceColors.map((row, i) =>
          row.map((color, j) => (
            <rect
              key={`${face}-${i}-${j}`}
              x={x + gap + j * stickerSize}
              y={y + gap + i * stickerSize}
              width={stickerSize - gap}
              height={stickerSize - gap}
              fill={COLOR_MAP[color]}
              stroke="#000"
              strokeWidth="1"
              rx="2"
              style={{ 
                cursor: editMode ? 'pointer' : 'default',
                transition: 'all 0.3s ease'
              }}
              onClick={editMode ? () => onStickerClick?.(face, i, j) : undefined}
              className={editMode ? 'hover:opacity-80' : ''}
            />
          ))
        )}
      </g>
    );
  };

  const totalWidth = faceSize * 4;
  const totalHeight = faceSize * 3;

  return (
    <div className="flex justify-center items-center p-4">
      <svg 
        width={totalWidth} 
        height={totalHeight} 
        className="border border-gray-300 rounded-lg bg-gray-50"
      >
        {/* Top face (U) */}
        {renderFace('U', faceSize, 0, 'U')}
        
        {/* Middle row: L, F, R, B */}
        {renderFace('L', 0, faceSize, 'L')}
        {renderFace('F', faceSize, faceSize, 'F')}
        {renderFace('R', faceSize * 2, faceSize, 'R')}
        {renderFace('B', faceSize * 3, faceSize, 'B')}
        
        {/* Bottom face (D) */}
        {renderFace('D', faceSize, faceSize * 2, 'D')}
      </svg>
    </div>
  );
};