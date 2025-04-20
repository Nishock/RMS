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

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#1a237e',
      },
    },
    '& label.Mui-focused': {
      color: '#1a237e',
    },
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
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: '#1a237e',
              textAlign: 'center'
            }}
          >
            Create Account
          </Typography>

          {error && (
            <Typography 
              color="error" 
              sx={{ 
                mt: 1, 
                mb: 2,
                textAlign: 'center',
                backgroundColor: '#ffebee',
                p: 1,
                borderRadius: 1
              }}
            >
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Full Name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              sx={textFieldSx}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              sx={textFieldSx}
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
              sx={textFieldSx}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              sx={textFieldSx}
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
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
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
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
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
              sx={textFieldSx}
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
                sx={textFieldSx}
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
                sx={textFieldSx}
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
                backgroundColor: '#1a237e',
                '&:hover': {
                  backgroundColor: '#283593',
                },
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Button
                  onClick={() => navigate('/login')}
                  sx={{
                    textTransform: 'none',
                    color: '#1a237e',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'transparent',
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
      </Box>
    </Container>
  );
}; 