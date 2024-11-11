import { useAuthStore } from '../store/authStore';
import StudentDashboard from './StudentDashboard';
import CoachDashboard from './CoachDashboard';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return user.role === 'student' ? <StudentDashboard /> : <CoachDashboard />;
}