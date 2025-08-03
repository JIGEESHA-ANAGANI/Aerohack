import { CubeState, Color, Face } from '../types/cube';

export class RubiksCube {
  private state: CubeState;

  constructor() {
    this.state = this.getSolvedState();
  }

  public getSolvedState(): CubeState {
    return {
      U: [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']],
      R: [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']],
      F: [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']],
      D: [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']],
      L: [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']],
      B: [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']]
    };
  }

  public getState(): CubeState {
    return JSON.parse(JSON.stringify(this.state));
  }

  public setState(newState: CubeState): void {
    this.state = JSON.parse(JSON.stringify(newState));
  }

  public reset(): void {
    this.state = this.getSolvedState();
  }

  public scramble(): void {
    const moves = ['U', 'U\'', 'U2', 'R', 'R\'', 'R2', 'F', 'F\'', 'F2', 'D', 'D\'', 'D2', 'L', 'L\'', 'L2', 'B', 'B\'', 'B2'];
    const scrambleLength = 20 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < scrambleLength; i++) {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      this.executeMove(randomMove);
    }
  }

  public executeMove(move: string): void {
    const baseFace = move[0] as Face;
    const modifier = move.slice(1);

    switch (modifier) {
      case '':
        this.rotateFaceClockwise(baseFace);
        break;
      case '\'':
        this.rotateFaceCounterClockwise(baseFace);
        break;
      case '2':
        this.rotateFaceClockwise(baseFace);
        this.rotateFaceClockwise(baseFace);
        break;
    }
  }

  private rotateFaceClockwise(face: Face): void {
    // Rotate the face itself
    this.rotateMatrix(this.state[face]);
    
    // Rotate adjacent edges
    this.rotateAdjacentEdges(face, false);
  }

  private rotateFaceCounterClockwise(face: Face): void {
    // Rotate the face itself 3 times (equivalent to counter-clockwise)
    this.rotateMatrix(this.state[face]);
    this.rotateMatrix(this.state[face]);
    this.rotateMatrix(this.state[face]);
    
    // Rotate adjacent edges
    this.rotateAdjacentEdges(face, true);
  }

  private rotateMatrix(matrix: Color[][]): void {
    const temp = matrix[0][0];
    matrix[0][0] = matrix[2][0];
    matrix[2][0] = matrix[2][2];
    matrix[2][2] = matrix[0][2];
    matrix[0][2] = temp;

    const temp2 = matrix[0][1];
    matrix[0][1] = matrix[1][0];
    matrix[1][0] = matrix[2][1];
    matrix[2][1] = matrix[1][2];
    matrix[1][2] = temp2;
  }

  private rotateAdjacentEdges(face: Face, counterClockwise: boolean): void {
    const temp = new Array(3);
    
    switch (face) {
      case 'U':
        if (!counterClockwise) {
          // Store F top row
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[0][i];
          // F <- R
          for (let i = 0; i < 3; i++) this.state.F[0][i] = this.state.R[0][i];
          // R <- B
          for (let i = 0; i < 3; i++) this.state.R[0][i] = this.state.B[0][i];
          // B <- L
          for (let i = 0; i < 3; i++) this.state.B[0][i] = this.state.L[0][i];
          // L <- temp
          for (let i = 0; i < 3; i++) this.state.L[0][i] = temp[i];
        } else {
          // Store F top row
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[0][i];
          // F <- L
          for (let i = 0; i < 3; i++) this.state.F[0][i] = this.state.L[0][i];
          // L <- B
          for (let i = 0; i < 3; i++) this.state.L[0][i] = this.state.B[0][i];
          // B <- R
          for (let i = 0; i < 3; i++) this.state.B[0][i] = this.state.R[0][i];
          // R <- temp
          for (let i = 0; i < 3; i++) this.state.R[0][i] = temp[i];
        }
        break;
        
      case 'R':
        if (!counterClockwise) {
          // Store F right column
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[i][2];
          // F <- D
          for (let i = 0; i < 3; i++) this.state.F[i][2] = this.state.D[i][2];
          // D <- B (reversed)
          for (let i = 0; i < 3; i++) this.state.D[i][2] = this.state.B[2-i][0];
          // B <- U (reversed)
          for (let i = 0; i < 3; i++) this.state.B[2-i][0] = this.state.U[i][2];
          // U <- temp
          for (let i = 0; i < 3; i++) this.state.U[i][2] = temp[i];
        } else {
          // Store F right column
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[i][2];
          // F <- U
          for (let i = 0; i < 3; i++) this.state.F[i][2] = this.state.U[i][2];
          // U <- B (reversed)
          for (let i = 0; i < 3; i++) this.state.U[i][2] = this.state.B[2-i][0];
          // B <- D (reversed)
          for (let i = 0; i < 3; i++) this.state.B[2-i][0] = this.state.D[i][2];
          // D <- temp
          for (let i = 0; i < 3; i++) this.state.D[i][2] = temp[i];
        }
        break;
        
      case 'F':
        if (!counterClockwise) {
          // Store U bottom row
          for (let i = 0; i < 3; i++) temp[i] = this.state.U[2][i];
          // U <- L (right column reversed)
          for (let i = 0; i < 3; i++) this.state.U[2][i] = this.state.L[2-i][2];
          // L <- D (top row)
          for (let i = 0; i < 3; i++) this.state.L[i][2] = this.state.D[0][i];
          // D <- R (left column reversed)
          for (let i = 0; i < 3; i++) this.state.D[0][i] = this.state.R[2-i][0];
          // R <- temp
          for (let i = 0; i < 3; i++) this.state.R[i][0] = temp[i];
        } else {
          // Store U bottom row
          for (let i = 0; i < 3; i++) temp[i] = this.state.U[2][i];
          // U <- R (left column)
          for (let i = 0; i < 3; i++) this.state.U[2][i] = this.state.R[i][0];
          // R <- D (top row reversed)
          for (let i = 0; i < 3; i++) this.state.R[i][0] = this.state.D[0][2-i];
          // D <- L (right column)
          for (let i = 0; i < 3; i++) this.state.D[0][i] = this.state.L[i][2];
          // L <- temp (reversed)
          for (let i = 0; i < 3; i++) this.state.L[i][2] = temp[2-i];
        }
        break;
        
      case 'D':
        if (!counterClockwise) {
          // Store F bottom row
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[2][i];
          // F <- L
          for (let i = 0; i < 3; i++) this.state.F[2][i] = this.state.L[2][i];
          // L <- B
          for (let i = 0; i < 3; i++) this.state.L[2][i] = this.state.B[2][i];
          // B <- R
          for (let i = 0; i < 3; i++) this.state.B[2][i] = this.state.R[2][i];
          // R <- temp
          for (let i = 0; i < 3; i++) this.state.R[2][i] = temp[i];
        } else {
          // Store F bottom row
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[2][i];
          // F <- R
          for (let i = 0; i < 3; i++) this.state.F[2][i] = this.state.R[2][i];
          // R <- B
          for (let i = 0; i < 3; i++) this.state.R[2][i] = this.state.B[2][i];
          // B <- L
          for (let i = 0; i < 3; i++) this.state.B[2][i] = this.state.L[2][i];
          // L <- temp
          for (let i = 0; i < 3; i++) this.state.L[2][i] = temp[i];
        }
        break;
        
      case 'L':
        if (!counterClockwise) {
          // Store F left column
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[i][0];
          // F <- U
          for (let i = 0; i < 3; i++) this.state.F[i][0] = this.state.U[i][0];
          // U <- B (reversed)
          for (let i = 0; i < 3; i++) this.state.U[i][0] = this.state.B[2-i][2];
          // B <- D (reversed)
          for (let i = 0; i < 3; i++) this.state.B[2-i][2] = this.state.D[i][0];
          // D <- temp
          for (let i = 0; i < 3; i++) this.state.D[i][0] = temp[i];
        } else {
          // Store F left column
          for (let i = 0; i < 3; i++) temp[i] = this.state.F[i][0];
          // F <- D
          for (let i = 0; i < 3; i++) this.state.F[i][0] = this.state.D[i][0];
          // D <- B (reversed)
          for (let i = 0; i < 3; i++) this.state.D[i][0] = this.state.B[2-i][2];
          // B <- U (reversed)
          for (let i = 0; i < 3; i++) this.state.B[2-i][2] = this.state.U[i][0];
          // U <- temp
          for (let i = 0; i < 3; i++) this.state.U[i][0] = temp[i];
        }
        break;
        
      case 'B':
        if (!counterClockwise) {
          // Store U top row
          for (let i = 0; i < 3; i++) temp[i] = this.state.U[0][i];
          // U <- R (right column)
          for (let i = 0; i < 3; i++) this.state.U[0][i] = this.state.R[i][2];
          // R <- D (bottom row reversed)
          for (let i = 0; i < 3; i++) this.state.R[i][2] = this.state.D[2][2-i];
          // D <- L (left column)
          for (let i = 0; i < 3; i++) this.state.D[2][i] = this.state.L[i][0];
          // L <- temp (reversed)
          for (let i = 0; i < 3; i++) this.state.L[i][0] = temp[2-i];
        } else {
          // Store U top row
          for (let i = 0; i < 3; i++) temp[i] = this.state.U[0][i];
          // U <- L (left column reversed)
          for (let i = 0; i < 3; i++) this.state.U[0][i] = this.state.L[2-i][0];
          // L <- D (bottom row)
          for (let i = 0; i < 3; i++) this.state.L[i][0] = this.state.D[2][i];
          // D <- R (right column reversed)
          for (let i = 0; i < 3; i++) this.state.D[2][i] = this.state.R[2-i][2];
          // R <- temp
          for (let i = 0; i < 3; i++) this.state.R[i][2] = temp[i];
        }
        break;
    }
  }

  public executeSequence(moveSequence: string): string[] {
    const moves = this.parseMoveSequence(moveSequence);
    moves.forEach(move => this.executeMove(move));
    return moves;
  }

  public parseMoveSequence(sequence: string): string[] {
    const moves: string[] = [];
    const tokens = sequence.trim().split(/\s+/);
    
    for (const token of tokens) {
      if (this.isValidMove(token)) {
        moves.push(token);
      }
    }
    
    return moves;
  }

  private isValidMove(move: string): boolean {
    const validMoves = ['U', 'U\'', 'U2', 'R', 'R\'', 'R2', 'F', 'F\'', 'F2', 'D', 'D\'', 'D2', 'L', 'L\'', 'L2', 'B', 'B\'', 'B2'];
    return validMoves.includes(move);
  }

  public isSolved(): boolean {
    for (const face of Object.keys(this.state) as Face[]) {
      const faceColors = this.state[face];
      const centerColor = faceColors[1][1];
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (faceColors[i][j] !== centerColor) {
            return false;
          }
        }
      }
    }
    return true;
  }

  public getStateString(): string {
    let result = '';
    const faceOrder: Face[] = ['U', 'R', 'F', 'D', 'L', 'B'];
    
    for (const face of faceOrder) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          result += this.state[face][i][j];
        }
      }
    }
    
    return result;
  }
}