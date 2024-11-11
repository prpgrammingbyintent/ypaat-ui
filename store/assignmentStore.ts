import { create } from 'zustand';
import { Assignment } from '../types';

interface AssignmentState {
  assignments: Assignment[];
  createAssignment: (assignment: Omit<Assignment, 'id' | 'status' | 'assignedAt' | 'attempts'>) => void;
  completeAssignment: (id: string) => void;
  getStudentAssignments: (studentId: string) => Assignment[];
  getCoachAssignments: (coachId: string) => Assignment[];
}

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  assignments: [],
  createAssignment: (assignment) => {
    set((state) => ({
      assignments: [
        ...state.assignments,
        {
          ...assignment,
          id: String(state.assignments.length + 1),
          status: 'pending',
          assignedAt: new Date().toISOString(),
          attempts: 0,
        },
      ],
    }));
  },
  completeAssignment: (id) => {
    set((state) => ({
      assignments: state.assignments.map((a) =>
        a.id === id
          ? { ...a, status: 'completed', completedAt: new Date().toISOString() }
          : a
      ),
    }));
  },
  getStudentAssignments: (studentId) => 
    get().assignments.filter((a) => a.studentId === studentId),
  getCoachAssignments: (coachId) => 
    get().assignments.filter((a) => a.coachId === coachId),
}));