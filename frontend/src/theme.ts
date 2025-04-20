import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#685FFF',
      light: '#8C85FF',
      dark: '#4B44CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF4B4B',
      light: '#FF7373',
      dark: '#CC3939',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0F1624',
      paper: 'rgba(26, 35, 50, 0.95)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    action: {
      hover: 'rgba(104, 95, 255, 0.08)',
      selected: 'rgba(104, 95, 255, 0.16)',
    },
    error: {
      main: '#FF4B4B',
    },
    warning: {
      main: '#FFD700',
    },
    info: {
      main: '#00B4D8',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.9375rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            borderRadius: 8,
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 22, 36, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 35, 50, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(104, 95, 255, 0.5)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(104, 95, 255, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #685FFF, #8C85FF)',
          '&:hover': {
            background: 'linear-gradient(45deg, #8C85FF, #685FFF)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          '&:hover': {
            borderColor: '#685FFF',
            background: 'rgba(104, 95, 255, 0.1)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 8px rgba(0,0,0,0.1)',
    '0 8px 16px rgba(0,0,0,0.1)',
    '0 12px 24px rgba(0,0,0,0.1)',
    '0 16px 32px rgba(0,0,0,0.1)',
    '0 20px 40px rgba(0,0,0,0.1)',
    '0 24px 48px rgba(0,0,0,0.1)',
    '0 28px 56px rgba(0,0,0,0.1)',
    '0 32px 64px rgba(0,0,0,0.1)',
    '0 36px 72px rgba(0,0,0,0.1)',
    '0 40px 80px rgba(0,0,0,0.1)',
    '0 44px 88px rgba(0,0,0,0.1)',
    '0 48px 96px rgba(0,0,0,0.1)',
    '0 52px 104px rgba(0,0,0,0.1)',
    '0 56px 112px rgba(0,0,0,0.1)',
    '0 60px 120px rgba(0,0,0,0.1)',
    '0 64px 128px rgba(0,0,0,0.1)',
    '0 68px 136px rgba(0,0,0,0.1)',
    '0 72px 144px rgba(0,0,0,0.1)',
    '0 76px 152px rgba(0,0,0,0.1)',
    '0 80px 160px rgba(0,0,0,0.1)',
    '0 84px 168px rgba(0,0,0,0.1)',
    '0 88px 176px rgba(0,0,0,0.1)',
    '0 92px 184px rgba(0,0,0,0.1)',
  ],
}); 