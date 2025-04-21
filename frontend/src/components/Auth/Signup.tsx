import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Paper,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';

interface SignupProps {
  onSignup: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    rollNumber?: string;
    teacherId?: string;
  }) => Promise<void>;
}

export const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    role: 'student' as UserRole,
    rollNumber: '',
    teacherId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const signupData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        ...(formData.role === 'student' ? { rollNumber: formData.rollNumber } : {}),
        ...(formData.role === 'teacher' ? { teacherId: formData.teacherId } : {}),
      };
      await onSignup(signupData);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: 'rgba(147, 51, 234, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9333EA',
        borderWidth: 2,
      },
      '& input': {
        color: '#fff',
      },
      '& .MuiSelect-select': {
        color: '#fff',
      }
    },
    '& label': {
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: 500,
    },
    '& label.Mui-focused': {
      color: '#9333EA',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            background: 'rgba(30, 41, 59, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center',
              letterSpacing: '-0.025em',
            }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
            }}
          >
            Sign up to get started
          </Typography>

          {error && (
            <Box
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <Typography
                color="error"
                variant="body2"
                sx={{
                  color: '#f87171',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Full Name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              sx={inputStyles}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              sx={inputStyles}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={inputStyles}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              sx={inputStyles}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
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
              sx={inputStyles}
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
                sx={inputStyles}
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
                sx={inputStyles}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(to right, #9333EA, #4F46E5)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  background: 'linear-gradient(to right, #7E22CE, #4338CA)',
                  boxShadow: '0 10px 15px -3px rgba(147, 51, 234, 0.3)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Create Account
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Already have an account?{' '}
                <Button
                  onClick={() => navigate('/login')}
                  sx={{
                    textTransform: 'none',
                    color: '#9333EA',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#7E22CE',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}; 