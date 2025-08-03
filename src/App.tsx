import React from 'react';
import { CubeRenderer } from './components/CubeRenderer';
import { ControlPanel } from './components/ControlPanel';
import { MoveHistory } from './components/MoveHistory';
import { SolutionDisplay } from './components/SolutionDisplay';
import { ColorPicker } from './components/ColorPicker';
import { useCubeSimulator } from './hooks/useCubeSimulator';
import { Cuboid as Cube, Trophy, Info } from 'lucide-react';

function App() {
  const {
    cubeState,
    moveHistory,
    currentHistoryIndex,
    solution,
    currentSolutionIndex,
    isPlaying,
    editMode,
    selectedColor,
    executeMoves,
    reset,
    scramble,
    solve,
    goToPreviousMove,
    goToNextMove,
    goToHistoryIndex,
    togglePlay,
    editSticker,
    toggleEditMode,
    setSelectedColor,
    canUndo,
    canRedo,
    isSolved
  } = useCubeSimulator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cube className="text-blue-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🧩 Rubik's Cube Simulator
                </h1>
                <p className="text-gray-600">Interactive cube with advanced Kociemba solver integration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isSolved && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200 animate-pulse">
                  <Trophy size={24} />
                  <span className="font-semibold">🎉 Solved!</span>
                </div>
              )}
              
              <div className="text-right text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg">
                <div>Moves: {moveHistory.length}</div>
                <div>Position: {currentHistoryIndex + 1}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cube and Solution */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Info className="text-blue-600 mt-0.5" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">📚 How to use this simulator:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Enter moves using standard notation (R, U', F2, etc.)</li>
                    <li>Use Scramble to randomize the cube</li>
                    <li>Click Auto Solve to get optimal solution with enhanced Kociemba algorithm</li>
                    <li>Use playback controls to step through moves</li>
                    <li>Enable Edit Mode to manually change sticker colors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cube Visualization */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                🎲 3D Cube - Unfolded Net View
              </h2>
              <CubeRenderer 
                cubeState={cubeState}
                stickerSize={40}
                onStickerClick={editSticker}
                editMode={editMode}
              />
            </div>

            {/* Solution Display */}
            <SolutionDisplay 
              solution={solution}
              currentMoveIndex={currentSolutionIndex}
              isVisible={solution.length > 0}
            />
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            {/* Control Panel */}
            <ControlPanel 
              onExecuteMoves={executeMoves}
              onReset={reset}
              onScramble={scramble}
              onSolve={solve}
              onPreviousMove={goToPreviousMove}
              onNextMove={goToNextMove}
              onToggleEditMode={toggleEditMode}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              editMode={editMode}
              canUndo={canUndo}
              canRedo={canRedo}
            />

            {/* Color Picker */}
            <ColorPicker 
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              isVisible={editMode}
            />

            {/* Move History */}
            <MoveHistory 
              history={moveHistory}
              currentIndex={currentHistoryIndex}
              onHistoryClick={goToHistoryIndex}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              🏆 Professional Rubik's Cube Simulator with Enhanced Kociemba Integration
            </p>
            <p className="text-sm">
              ✨ Unlimited move input • Real-time visualization • Optimal solving algorithms • Layer-by-layer method
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
