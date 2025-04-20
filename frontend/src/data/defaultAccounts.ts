import { UserRole } from '../types';

interface DefaultAccount {
  email: string;
  password: string;
  name: string;
  username: string;
  role: UserRole;
  phone: string;
  teacherId?: string;
  rollNumber?: string;
}

export const defaultAccounts: DefaultAccount[] = [
  {
    email: 'admin@rms.com',
    password: 'admin123',
    name: 'Admin User',
    username: 'admin',
    role: 'admin',
    phone: '1234567890'
  },
  {
    email: 'teacher@rms.com',
    password: 'teacher123',
    name: 'Teacher User',
    username: 'teacher',
    role: 'teacher',
    phone: '2345678901',
    teacherId: 'T123'
  },
  {
    email: 'student@rms.com',
    password: 'student123',
    name: 'Student User',
    username: 'student',
    role: 'student',
    phone: '3456789012',
    rollNumber: 'R123'
  }
]; 