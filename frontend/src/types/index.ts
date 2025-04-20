export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: 'admin' | 'teacher' | 'student';
  rollNumber?: string;  // for students
  teacherId?: string;   // for teachers
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  activeUsers: number;
  performanceMetrics: {
    date: string;
    value: number;
  }[];
} 