import React from 'react';

interface SolutionDisplayProps {
  solution: string[];
  currentMoveIndex: number;
  isVisible: boolean;
}

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ 
  solution, 
  currentMoveIndex, 
  isVisible 
}) => {
  if (!isVisible || solution.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🎯 Optimal Solution ({solution.length} moves)
      </h3>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {solution.map((move, index) => (
            <span
              key={index}
              className={`
                px-3 py-2 rounded-lg font-mono text-lg font-bold transition-all duration-300 shadow-sm
                ${index === currentMoveIndex 
                  ? 'bg-blue-500 text-white scale-110 shadow-lg ring-2 ring-blue-300' 
                  : index < currentMoveIndex
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {move}
            </span>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 flex justify-between items-center">
          <span>Progress: {currentMoveIndex} / {solution.length} moves</span>
          <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
            {Math.round((currentMoveIndex / solution.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${(currentMoveIndex / solution.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};