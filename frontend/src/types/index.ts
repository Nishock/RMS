export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  phone: string;
  teacherId?: string;
  rollNumber?: string;
  createdAt: string;
  updatedAt: string;
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