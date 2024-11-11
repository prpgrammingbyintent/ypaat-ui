import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useAssignmentStore } from '../store/assignmentStore';
import { usePuzzleStore } from '../store/puzzleStore';
import PuzzleCard from '../components/PuzzleCard';
import { Assignment, Puzzle } from '../types';

export default function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const getStudentAssignments = useAssignmentStore((state) => state.getStudentAssignments);
  const getPuzzle = usePuzzleStore((state) => state.getPuzzle);
  const [assignments, setAssignments] = useState<(Assignment & { puzzle: Puzzle })[]>([]);

  useEffect(() => {
    if (user) {
      const studentAssignments = getStudentAssignments(user.id);
      setAssignments(
        studentAssignments
          .map((assignment) => ({
            ...assignment,
            puzzle: getPuzzle(assignment.puzzleId)!,
          }))
          .filter((a) => a.puzzle)
      );
    }
  }, [user, getStudentAssignments, getPuzzle]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Assignments</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <PuzzleCard
              key={assignment.id}
              puzzle={assignment.puzzle}
              completed={assignment.status === 'completed'}
              onClick={() => {/* Navigate to puzzle solver */}}
            />
          ))}
        </div>

        {assignments.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No assignments yet. Check back later!
          </div>
        )}
      </div>
    </div>
  );
}