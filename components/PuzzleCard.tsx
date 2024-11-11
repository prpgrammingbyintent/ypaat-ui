import { Puzzle } from '../types';
import { CheckCircle } from 'lucide-react';

interface PuzzleCardProps {
  puzzle: Puzzle;
  completed?: boolean;
  onClick?: () => void;
}

export default function PuzzleCard({ puzzle, completed, onClick }: PuzzleCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg shadow-md p-6 cursor-pointer
        transition-transform hover:scale-105
        ${completed ? 'border-2 border-green-500' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{puzzle.description}</h3>
        {completed && <CheckCircle className="text-green-500" />}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Difficulty: <span className="font-medium">{puzzle.difficulty}</span>
        </p>
      </div>
    </div>
  );
}