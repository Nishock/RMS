import axios from 'axios';
import { User } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (
  email: string,
  password: string,
  role: string,
  teacherId?: string,
  rollNumber?: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
      role,
      ...(role === 'teacher' ? { teacherId } : {}),
      ...(role === 'student' ? { rollNumber } : {}),
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    // Ensure the role is of the correct type
    const userData = response.data.user;
    if (!['admin', 'teacher', 'student'].includes(userData.role)) {
      throw new Error('Invalid role received from server');
    }

    return response.data as LoginResponse;
  } catch (error) {
    throw error;
  }
};

export const signup = async (data: {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  rollNumber?: string;
  teacherId?: string;
}): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    // Ensure the role is of the correct type
    const userData = response.data.user;
    if (!['admin', 'teacher', 'student'].includes(userData.role)) {
      throw new Error('Invalid role received from server');
    }
    
    return response.data as LoginResponse;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Signup failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Signup failed');
    }
  }
};

export const verifyToken = async (token: string): Promise<LoginResponse> => {
  const response = await axios.get(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  // Ensure the role is of the correct type
  const userData = response.data.user;
  if (!['admin', 'teacher', 'student'].includes(userData.role)) {
    throw new Error('Invalid role received from server');
  }
  
  return response.data as LoginResponse;
}; 