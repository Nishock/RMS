import axios from 'axios';
import { User, UserRole } from '../types';
import { defaultAccounts } from '../data/defaultAccounts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (
  email: string,
  password: string,
  role: UserRole,
  teacherId?: string,
  rollNumber?: string
): Promise<LoginResponse> => {
  try {
    // Find matching default account
    const account = defaultAccounts.find(acc => 
      acc.email === email && 
      acc.password === password && 
      acc.role === role &&
      (role !== 'teacher' || acc.teacherId === teacherId) &&
      (role !== 'student' || acc.rollNumber === rollNumber)
    );

    if (!account) {
      throw new Error('Invalid credentials');
    }

    // Generate a mock token
    const token = btoa(JSON.stringify({ userId: email, role }));

    // Create user object
    const user: User = {
      ...account,
      _id: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
};

export const signup = async (data: {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  rollNumber?: string;
  teacherId?: string;
}): Promise<LoginResponse> => {
  try {
    // Check if account already exists
    const exists = defaultAccounts.some(acc => acc.email === data.email);
    if (exists) {
      throw new Error('User already exists');
    }

    // For demo, we'll just login with default account based on role
    const defaultAccount = defaultAccounts.find(acc => acc.role === data.role);
    if (!defaultAccount) {
      throw new Error('Invalid role');
    }

    return login(
      defaultAccount.email,
      defaultAccount.password,
      defaultAccount.role,
      data.teacherId,
      data.rollNumber
    );
  } catch (error: any) {
    throw new Error(error.message || 'Signup failed');
  }
};

export const verifyToken = async (token: string): Promise<LoginResponse> => {
  try {
    // Decode token
    const decoded = JSON.parse(atob(token));
    
    // Find matching default account
    const account = defaultAccounts.find(acc => 
      acc.email === decoded.userId && 
      acc.role === decoded.role
    );

    if (!account) {
      throw new Error('Invalid token');
    }

    // Create user object
    const user: User = {
      ...account,
      _id: account.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return { token, user };
  } catch (error: any) {
    throw new Error('Token verification failed');
  }
};
