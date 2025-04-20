import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  styled,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';

// Styled components
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 25,
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 20px',
    color: '#333',
    fontSize: '1rem',
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    fontSize: '1rem',
    '&.Mui-focused': {
      color: '#2196f3',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
});

const StyledSelect = styled(Select)({
  borderRadius: 25,
  backgroundColor: '#fff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
  '& .MuiSelect-select': {
    padding: '16px 20px',
    color: '#333',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
});

interface LoginProps {
  onLogin: (credentials: {
    email: string;
    password: string;
    role: UserRole;
    teacherId?: string;
    rollNumber?: string;
  }) => Promise<void>;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as UserRole,
    teacherId: '',
    rollNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin(formData);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="role"
            label="Role"
            select
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          {formData.role === 'teacher' && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="teacherId"
              label="Teacher ID"
              value={formData.teacherId}
              onChange={handleChange}
            />
          )}
          {formData.role === 'student' && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="rollNumber"
              label="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}; 