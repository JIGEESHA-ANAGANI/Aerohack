import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle, Square, Edit3 } from 'lucide-react';

interface ControlPanelProps {
  onExecuteMoves: (moves: string) => void;
  onReset: () => void;
  onScramble: () => void;
  onSolve: () => void;
  onPreviousMove: () => void;
  onNextMove: () => void;
  onToggleEditMode: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  editMode: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onExecuteMoves,
  onReset,
  onScramble,
  onSolve,
  onPreviousMove,
  onNextMove,
  onToggleEditMode,
  isPlaying,
  onTogglePlay,
  editMode,
  canUndo,
  canRedo
}) => {
  const [moveInput, setMoveInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (moveInput.trim()) {
      onExecuteMoves(moveInput.trim());
      setMoveInput('');
    }
  };

  const buttonClass = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-md";
  const primaryButtonClass = `${buttonClass} bg-blue-600 text-white hover:bg-blue-700`;
  const secondaryButtonClass = `${buttonClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  const disabledButtonClass = `${buttonClass} bg-gray-100 text-gray-400 cursor-not-allowed`;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 space-y-6 border border-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎮 Cube Controls</h2>
        <p className="text-gray-600">Enter moves, scramble, or solve the cube automatically</p>
      </div>

      {/* Move Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="moves" className="block text-sm font-medium text-gray-700 mb-2">
            🔄 Move Sequence (e.g., R U R' U' F2 D2)
          </label>
          <input
            type="text"
            id="moves"
            value={moveInput}
            onChange={(e) => setMoveInput(e.target.value)}
            placeholder="Enter moves like R U R' U' F2..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono"
          />
        </div>
        <button 
          type="submit" 
          className={`${primaryButtonClass} ${!moveInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          disabled={!moveInput.trim()}
        >
          ⚡ Apply Moves
        </button>
      </form>

      {/* Cube Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onReset} 
          className={`${secondaryButtonClass} hover:scale-105`}
        >
          <RotateCcw size={18} />
          🔄 Reset
        </button>
        
        <button 
          onClick={onScramble} 
          className={`${secondaryButtonClass} hover:scale-105`}
        >
          <Shuffle size={18} />
          🎲 Scramble
        </button>
        
        <button 
          onClick={onSolve} 
          className={`${primaryButtonClass} hover:scale-105 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700`}
        >
          <Square size={18} />
          🎯 Auto Solve
        </button>
        
        <button 
          onClick={onToggleEditMode} 
          className={`${editMode ? primaryButtonClass : secondaryButtonClass} hover:scale-105`}
        >
          <Edit3 size={18} />
          {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
        </button>
      </div>

      {/* Playback Controls */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">🎬 Playback Controls</h3>
        <div className="flex gap-2">
          <button 
            onClick={onPreviousMove} 
            className={`${canUndo ? `${secondaryButtonClass} hover:scale-105` : disabledButtonClass}`}
            disabled={!canUndo}
          >
            <SkipBack size={18} />
          </button>
          
          <button 
            onClick={onTogglePlay} 
            className={`${primaryButtonClass} hover:scale-105 flex-1`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button 
            onClick={onNextMove} 
            className={`${canRedo ? `${secondaryButtonClass} hover:scale-105` : disabledButtonClass}`}
            disabled={!canRedo}
          >
            <SkipForward size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};