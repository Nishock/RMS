import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  onSignup: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    rollNumber?: string;
    teacherId?: string;
  }) => Promise<void>;
}

export const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    role: 'student',
    rollNumber: '',
    teacherId: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    
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
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please fill in the details below
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              sx={{ mb: 2 }}
              required
              helperText="Enter 10 digit phone number"
              inputProps={{
                pattern: "[0-9]{10}"
              }}
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              sx={{ mb: 2 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              sx={{ mb: 2 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            {formData.role === 'student' && (
              <TextField
                fullWidth
                label="Roll Number"
                variant="outlined"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                sx={{ mb: 2 }}
                required
              />
            )}

            {formData.role === 'teacher' && (
              <TextField
                fullWidth
                label="Teacher ID"
                variant="outlined"
                value={formData.teacherId}
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                sx={{ mb: 2 }}
                required
              />
            )}

            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mb: 2 }}
            >
              Sign Up
            </Button>

            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none' }}
              >
                Sign In
              </Button>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}; 