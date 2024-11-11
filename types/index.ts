export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'coach';
  verified: boolean;
}

export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  createdBy: string;
}

export interface Assignment {
  id: string;
  puzzleId: string;
  studentId: string;
  coachId: string;
  status: 'pending' | 'completed';
  assignedAt: string;
  completedAt?: string;
  attempts: number;
}