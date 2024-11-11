import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { usePuzzleStore } from '../store/puzzleStore';
import { useAssignmentStore } from '../store/assignmentStore';
import ChessBoard from '../components/ChessBoard';

export default function CoachDashboard() {
  const user = useAuthStore((state) => state.user);
  const createPuzzle = usePuzzleStore((state) => state.createPuzzle);
  const createAssignment = useAssignmentStore((state) => state.createAssignment);
  
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [solution, setSolution] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const handleCreatePuzzle = () => {
    if (!user) return;

    const puzzle = {
      fen,
      description,
      difficulty,
      solution: solution.split(' '),
      createdBy: user.id,
    };

    createPuzzle(puzzle);

    // Create assignment
    createAssignment({
      puzzleId: String(usePuzzleStore.getState().puzzles.length), // Latest puzzle
      studentId: '2', // Mock student ID (in real app, lookup by email)
      coachId: user.id,
    });

    // Reset form
    setDescription('');
    setSolution('');
    setStudentEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Puzzle</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ChessBoard fen={fen} onMove={(from, to) => setFen(to)} />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Solution (moves)</label>
                <input
                  type="text"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="e.g., e2e4 e7e5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Assign to Student (email)</label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleCreatePuzzle}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create & Assign Puzzle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}