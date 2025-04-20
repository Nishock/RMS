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
          minHeight: '100vh',
          backgroundColor: '#121212',
          pt: 4,
          pb: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            backgroundColor: '#1e1e1e',
            border: '1px solid #333',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: '#fff',
              textAlign: 'center'
            }}
          >
            Welcome Back
          </Typography>
          
          {error && (
            <Typography 
              color="error" 
              sx={{ 
                mt: 1, 
                mb: 2,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                color: '#ff6b6b',
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#333',
                  },
                  '&:hover fieldset': {
                    borderColor: '#666',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#90caf9',
                  },
                  '& input': {
                    color: '#fff',
                  }
                },
                '& label': {
                  color: '#999',
                },
                '& label.Mui-focused': {
                  color: '#90caf9',
                },
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#999' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#333',
                  },
                  '&:hover fieldset': {
                    borderColor: '#666',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#90caf9',
                  },
                  '& input': {
                    color: '#fff',
                  }
                },
                '& label': {
                  color: '#999',
                },
                '& label.Mui-focused': {
                  color: '#90caf9',
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#333',
                  },
                  '&:hover fieldset': {
                    borderColor: '#666',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#90caf9',
                  },
                  '& .MuiSelect-select': {
                    color: '#fff',
                  }
                },
                '& label': {
                  color: '#999',
                },
                '& label.Mui-focused': {
                  color: '#90caf9',
                },
                '& .MuiMenuItem-root': {
                  color: '#fff',
                }
              }}
            >
              <MenuItem value="student" sx={{ color: '#000' }}>Student</MenuItem>
              <MenuItem value="teacher" sx={{ color: '#000' }}>Teacher</MenuItem>
              <MenuItem value="admin" sx={{ color: '#000' }}>Admin</MenuItem>
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#333',
                    },
                    '&:hover fieldset': {
                      borderColor: '#666',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#90caf9',
                    },
                    '& input': {
                      color: '#fff',
                    }
                  },
                  '& label': {
                    color: '#999',
                  },
                  '& label.Mui-focused': {
                    color: '#90caf9',
                  },
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#333',
                    },
                    '&:hover fieldset': {
                      borderColor: '#666',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#90caf9',
                    },
                    '& input': {
                      color: '#fff',
                    }
                  },
                  '& label': {
                    color: '#999',
                  },
                  '& label.Mui-focused': {
                    color: '#90caf9',
                  },
                }}
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
                backgroundColor: '#90caf9',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#42a5f5',
                },
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#999' }}>
                Don't have an account?{' '}
                <Button
                  onClick={() => navigate('/signup')}
                  sx={{
                    textTransform: 'none',
                    color: '#90caf9',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}; 