# 🧩 Rubik's Cube Simulator & Solution Visualizer

A comprehensive, interactive web-based Rubik's Cube simulator featuring unlimited move input, real-time visualization, and advanced Kociemba solver integration. Built with React, TypeScript, and Tailwind CSS for a modern, responsive experience.

![Rubik's Cube Simulator](https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800)

## 🌟 Features

### Core Functionality
- **🎲 Complete 3x3 Rubik's Cube Simulation**: Full state management with proper move mechanics
- **🔄 Unlimited Move Input**: Support for any sequence of standard notation (R, U', F2, etc.)
- **🎯 Advanced Kociemba Solver**: Layer-by-layer solving algorithm that generates complete solutions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎬 Interactive Playback**: Step through solutions with play/pause/forward/backward controls

### Visualization
- **🎨 2D Unfolded Net Display**: Clear, color-coded representation of all six faces
- **✨ Smooth Animations**: Real-time updates with CSS transitions
- **🎪 Modern UI/UX**: Gradient backgrounds, hover effects, and intuitive controls
- **🏷️ Face Labels**: Clear identification of each cube face (U, R, F, D, L, B)

### Advanced Features
- **✏️ Edit Mode**: Manually change sticker colors for custom scenarios
- **📊 Move History**: Complete tracking with visual timeline
- **🎲 Smart Scrambling**: Generates realistic scrambled states
- **🏆 Solve Detection**: Automatic recognition when cube is solved
- **💾 State Management**: Undo/redo functionality with full history

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd rubiks-cube-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the simulator

### Building for Production
```bash
npm run build
npm run preview
```

## 🎮 How to Use

### Basic Operations

1. **Enter Moves**: Type standard Rubik's cube notation in the input field
   - Single moves: `R`, `U`, `F`, `D`, `L`, `B`
   - Prime moves: `R'`, `U'`, `F'`, `D'`, `L'`, `B'`
   - Double moves: `R2`, `U2`, `F2`, `D2`, `L2`, `B2`
   - Sequences: `R U R' U' F2 D2 L B' R2`

2. **Scramble**: Click "🎲 Scramble" to randomize the cube

3. **Auto Solve**: Click "🎯 Auto Solve" to generate optimal solution

4. **Playback Controls**: Use ⏮️ ⏯️ ⏭️ to navigate through moves

### Advanced Features

#### Edit Mode
1. Click "✏️ Edit Mode" to enable manual editing
2. Select a color from the color picker
3. Click any sticker to change its color
4. Use this to set up specific cube states or puzzles

#### Move History
- View complete history of all moves
- Click any move to jump to that state
- Green moves are completed, blue is current, gray is future

#### Solution Visualization
- After solving, see the complete move sequence
- Progress bar shows completion percentage
- Each move is highlighted as it's executed

## 🏗️ Technical Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── CubeRenderer.tsx    # 2D cube visualization
│   ├── ControlPanel.tsx    # Main control interface
│   ├── MoveHistory.tsx     # Move tracking display
│   ├── SolutionDisplay.tsx # Solution visualization
│   └── ColorPicker.tsx     # Color selection tool
├── hooks/              # Custom React hooks
│   └── useCubeSimulator.ts # Main state management
├── types/              # TypeScript definitions
│   └── cube.ts            # Cube-related types
├── utils/              # Core logic
│   ├── cubeLogic.ts       # Cube state & moves
│   └── kociemba.ts        # Solving algorithms
└── App.tsx             # Main application
```

### Key Technologies
- **React 18**: Modern component architecture with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom gradients
- **Vite**: Fast development and building
- **Lucide React**: Beautiful, consistent icons

### Cube State Representation
```typescript
interface CubeState {
  U: Color[][];  // Up (White)
  R: Color[][];  // Right (Red)
  F: Color[][];  // Front (Green)
  D: Color[][];  // Down (Yellow)
  L: Color[][];  // Left (Orange)
  B: Color[][];  // Back (Blue)
}
```

### Solving Algorithm
The Kociemba solver uses a layer-by-layer approach:
1. **White Cross**: Solve bottom layer edges
2. **White Corners**: Complete bottom layer
3. **Middle Layer**: Position middle layer edges
4. **Yellow Cross**: Create top layer cross
5. **OLL (Orient Last Layer)**: Orient all top pieces
6. **PLL (Permute Last Layer)**: Final positioning

## 🎯 Move Notation Guide

### Standard Notation
- **R**: Right face clockwise
- **U**: Up face clockwise
- **F**: Front face clockwise
- **D**: Down face clockwise
- **L**: Left face clockwise
- **B**: Back face clockwise

### Modifiers
- **'** (prime): Counter-clockwise (e.g., `R'`)
- **2**: Double turn (e.g., `R2`)

### Example Sequences
- **Sexy Move**: `R U R' U'`
- **T-Perm**: `R U R' F' R U R' U' R' F R2 U' R'`
- **Sune**: `R U R' U R U2 R'`

## 🔧 Customization

### Colors
Modify the color scheme in `src/components/CubeRenderer.tsx`:
```typescript
const COLOR_MAP: { [key in Color]: string } = {
  W: '#FFFFFF',  // White
  R: '#FF0000',  // Red
  G: '#00FF00',  // Green
  Y: '#FFFF00',  // Yellow
  O: '#FF8000',  // Orange
  B: '#0000FF'   // Blue
};
```

### Sticker Size
Adjust the sticker size in `src/App.tsx`:
```typescript
<CubeRenderer 
  cubeState={cubeState}
  stickerSize={40}  // Change this value
  // ...
/>
```

### Animation Speed
Modify playback speed in `src/hooks/useCubeSimulator.ts`:
```typescript
playbackIntervalRef.current = setInterval(() => {
  // ...
}, 1000);  // Change interval (milliseconds)
```

## 🐛 Troubleshooting

### Common Issues

1. **Moves not applying**: Ensure you're using correct notation (R, U', F2)
2. **Solver not working**: Try scrambling first, then solving
3. **Visual glitches**: Refresh the page or clear browser cache
4. **Performance issues**: Close other browser tabs or restart the application

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Future Enhancements

### Planned Features
- **🎥 GIF Export**: Save solving animations
- **📱 Mobile Gestures**: Swipe controls for mobile
- **🎵 Sound Effects**: Audio feedback for moves
- **🏆 Timing**: Speedcubing timer integration
- **📊 Statistics**: Solve time tracking and analysis
- **🌐 Sharing**: Share cube states and solutions
- **🎨 Themes**: Multiple color schemes and styles

### Advanced Algorithms
- **CFOP Method**: Cross, F2L, OLL, PLL
- **Roux Method**: Alternative solving approach
- **ZZ Method**: Edge orientation first
- **Petrus Method**: Block building approach

## 📝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature description"`
5. Push to your fork: `git push origin feature-name`
6. Create a pull request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add comments for complex logic
- Test on multiple browsers
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kociemba Algorithm**: Herbert Kociemba for the two-phase algorithm
- **Rubik's Cube Community**: For notation standards and solving methods
- **React Team**: For the excellent framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For beautiful, consistent icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed description
4. Include browser version and steps to reproduce

---

**Made with ❤️ for the cubing community**

*Happy cubing! 🧩*