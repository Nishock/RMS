import React from 'react';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
  onLogin: (credentials: { email: string; password: string; role: string; teacherId?: string; rollNumber?: string }) => Promise<void>;
}

type UserRole = 'student' | 'teacher' | 'admin';

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    role: 'student' as UserRole,
    teacherId: '',
    rollNumber: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'teacher' ? { teacherId: formData.teacherId } : {}),
        ...(formData.role === 'student' ? { rollNumber: formData.rollNumber } : {}),
      };
      await onLogin(loginData);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          maxWidth: 400,
          width: '100%',
          background: '#fff',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
            p: 3,
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 600,
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Sign in to continue
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              sx={{ mb: 3 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#666' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: '#666' }}>Role</InputLabel>
              <StyledSelect
                value={formData.role}
                label="Role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </StyledSelect>
            </FormControl>

            {formData.role === 'teacher' && (
              <StyledTextField
                fullWidth
                label="Teacher ID"
                variant="outlined"
                value={formData.teacherId}
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                sx={{ mb: 3 }}
                required
              />
            )}

            {formData.role === 'student' && (
              <StyledTextField
                fullWidth
                label="Roll Number"
                variant="outlined"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                sx={{ mb: 3 }}
                required
              />
            )}

            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mb: 2, 
                  textAlign: 'center',
                  fontWeight: 500,
                  textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 3,
                py: 1.5,
                borderRadius: 25,
                fontSize: '1.1rem',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #000DFF 0%, #6B73FF 100%)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                },
              }}
            >
              Sign In
            </Button>

            <Typography 
              variant="body2" 
              align="center"
              sx={{ 
                color: '#666',
                textShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              Don't have an account?{' '}
              <Button
                onClick={() => navigate('/signup')}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#000DFF',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 13, 255, 0.05)',
                  }
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}; 