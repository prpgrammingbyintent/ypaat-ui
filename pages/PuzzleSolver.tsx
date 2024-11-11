import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePuzzleStore } from '../store/puzzleStore';
import { useAssignmentStore } from '../store/assignmentStore';
import { useAuthStore } from '../store/authStore';
import ChessBoard from '../components/ChessBoard';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PuzzleSolver() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const puzzle = usePuzzleStore((state) => state.getPuzzle(id!));
  const completeAssignment = useAssignmentStore((state) => state.completeAssignment);
  
  const [moves, setMoves] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'success' | 'failed'>('playing');

  const handleMove = (from: string, to: string) => {
    if (status !== 'playing') return;
    
    const move = `${from}${to}`;
    const newMoves = [...moves, move];
    setMoves(newMoves);

    // Check if the move sequence matches the solution
    if (puzzle && newMoves.join(' ') === puzzle.solution.join(' ')) {
      setStatus('success');
      completeAssignment(id!);
    } else if (puzzle && newMoves.length >= puzzle.solution.length) {
      setStatus('failed');
    }
  };

  if (!puzzle || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{puzzle.description}</h1>
          
          <div className="flex justify-center mb-8">
            <ChessBoard
              fen={puzzle.fen}
              onMove={handleMove}
              viewOnly={status !== 'playing'}
            />
          </div>

          {status === 'success' && (
            <div className="flex items-center justify-center text-green-500 gap-2">
              <CheckCircle />
              <span className="text-lg font-medium">Correct! Well done!</span>
            </div>
          )}

          {status === 'failed' && (
            <div className="flex items-center justify-center text-red-500 gap-2">
              <XCircle />
              <span className="text-lg font-medium">Incorrect. Try again!</span>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-4">
            {status !== 'playing' && (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}