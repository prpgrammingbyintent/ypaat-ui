import { create } from 'zustand';
import { Puzzle } from '../types';

interface PuzzleState {
  puzzles: Puzzle[];
  createPuzzle: (puzzle: Omit<Puzzle, 'id'>) => void;
  getPuzzle: (id: string) => Puzzle | undefined;
}

export const usePuzzleStore = create<PuzzleState>((set, get) => ({
  puzzles: [
    {
      id: '1',
      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
      solution: ['d2d4'],
      difficulty: 'beginner',
      description: 'Find the best move for white',
      createdBy: 'coach1',
    },
  ],
  createPuzzle: (puzzle) => {
    set((state) => ({
      puzzles: [...state.puzzles, { ...puzzle, id: String(state.puzzles.length + 1) }],
    }));
  },
  getPuzzle: (id) => get().puzzles.find((p) => p.id === id),
}));