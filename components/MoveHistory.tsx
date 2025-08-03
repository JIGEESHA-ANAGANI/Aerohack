import React from 'react';
import { MoveHistoryItem } from '../types/cube';

interface MoveHistoryProps {
  history: MoveHistoryItem[];
  currentIndex: number;
  onHistoryClick: (index: number) => void;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ 
  history, 
  currentIndex, 
  onHistoryClick 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Move History</h3>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No moves yet</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => onHistoryClick(index)}
              className={`
                p-3 rounded-lg cursor-pointer transition-all duration-200
                ${index === currentIndex 
                  ? 'bg-blue-100 border-2 border-blue-500 text-blue-700' 
                  : index < currentIndex
                    ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100'
                    : 'bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-lg">{item.move}</span>
                <span className="text-xs opacity-75">#{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <div>Total moves: {history.length}</div>
            <div>Current position: {currentIndex + 1}</div>
          </div>
        </div>
      )}
    </div>
  );
};