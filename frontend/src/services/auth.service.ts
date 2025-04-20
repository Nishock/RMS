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
    }, {
      withCredentials: false,
    });

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    if (!['admin', 'teacher', 'student'].includes(user.role)) {
      throw new Error('Invalid role received from server');
    }

    return { token, user };
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message || 'Login failed');
    }
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
    const response = await axios.post(`${API_URL}/auth/signup`, data, {
      withCredentials: false,
    });

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    if (!['admin', 'teacher', 'student'].includes(user.role)) {
      throw new Error('Invalid role received from server');
    }

    return { token, user };
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message || 'Signup failed');
    }
  }
};

export const verifyToken = async (token: string): Promise<LoginResponse> => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    const { user } = response.data;

    if (!['admin', 'teacher', 'student'].includes(user.role)) {
      throw new Error('Invalid role received from server');
    }

    return response.data as LoginResponse;
  } catch (error: any) {
    throw new Error('Token verification failed');
  }
};
