import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  useTheme,
  Container,
  IconButton,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { User } from '../../types';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HideOnScroll>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar 
              sx={{ 
                justifyContent: 'space-between',
                py: 1,
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 2,
                }}
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="Screen Pilot"
                  sx={{
                    height: 40,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      background: 'linear-gradient(45deg, #685FFF, #FF4B4B)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 700,
                    }}
                  >
                    Screen Pilot
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      display: 'block',
                      marginTop: -0.5,
                    }}
                  >
                    by ACFM
                  </Typography>
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: { xs: 1, md: 2 },
                  alignItems: 'center',
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/home')}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  <HomeIcon />
                </IconButton>
                <Button
                  color="inherit"
                  startIcon={<HomeIcon />}
                  onClick={() => navigate('/home')}
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  Home
                </Button>

                <IconButton
                  color="inherit"
                  onClick={() => navigate('/about')}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  <InfoIcon />
                </IconButton>
                <Button
                  color="inherit"
                  startIcon={<InfoIcon />}
                  onClick={() => navigate('/about')}
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  About
                </Button>

                <IconButton
                  color="inherit"
                  onClick={() => navigate('/help')}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  <HelpIcon />
                </IconButton>
                <Button
                  color="inherit"
                  startIcon={<HelpIcon />}
                  onClick={() => navigate('/help')}
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  Help
                </Button>

                <IconButton
                  color="inherit"
                  onClick={onLogout}
                  sx={{ 
                    display: { xs: 'flex', md: 'none' },
                    bgcolor: 'rgba(255, 75, 75, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 75, 75, 0.2)',
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={onLogout}
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    borderColor: theme.palette.error.main,
                    color: theme.palette.error.main,
                    '&:hover': {
                      borderColor: theme.palette.error.dark,
                      backgroundColor: 'rgba(255, 75, 75, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px',
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}; 