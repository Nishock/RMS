import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  Container,
  Fade,
  keyframes,
  Divider,
  Link,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import MovieIcon from '@mui/icons-material/Movie';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(104, 95, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(104, 95, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(104, 95, 255, 0.2); }
`;

export const StudentDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: 'Revise a Topic',
      subtitle: 'Podcast',
      icon: <HeadphonesIcon sx={{ fontSize: 40, color: '#00B4D8' }} />,
      path: '/student/revise',
      bgColor: 'rgba(0, 180, 216, 0.1)',
      gradient: 'linear-gradient(135deg, rgba(0, 180, 216, 0.2) 0%, rgba(0, 180, 216, 0.1) 100%)',
    },
    {
      title: 'Test My Skills',
      subtitle: 'Prepare Any Topic',
      icon: <QuizIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
      path: '/student/quiz',
      bgColor: 'rgba(255, 215, 0, 0.1)',
      gradient: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
    },
    {
      title: 'Generate and Submit Assignment',
      subtitle: 'For Feedback',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#FF4B4B' }} />,
      path: '/student/assignment',
      bgColor: 'rgba(255, 75, 75, 0.1)',
      gradient: 'linear-gradient(135deg, rgba(255, 75, 75, 0.2) 0%, rgba(255, 75, 75, 0.1) 100%)',
    },
    {
      title: 'Submit Script',
      subtitle: 'For Feedback',
      icon: <MovieIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      path: '/student/script',
      bgColor: 'rgba(76, 175, 80, 0.1)',
      gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)',
    },
  ];

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6, maxWidth: '800px', mx: 'auto' }}>
            <Typography 
              component="h1" 
              sx={{ 
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <span style={{ color: '#FF4B4B' }}>Hi,</span>{' '}
              <span style={{ color: '#FFD700' }}>I'm</span>{' '}
              <span style={{ color: '#4CAF50' }}>your</span>{' '}
              <span style={{ color: '#00B4D8' }}>AI</span>{' '}
              <span style={{ color: '#FFFFFF' }}>Screen Pilot.</span>
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                mb: 1,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              How can I help you today?
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                opacity: 0.8,
              }}
            >
              A service of Annapurna College of Film and Media
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3} sx={{ maxWidth: '1200px', mx: 'auto' }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Fade in timeout={1000 + (index * 200)}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    background: feature.gradient,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      animation: `${float} 6s ease-in-out infinite`,
                      '&:before': {
                        opacity: 1,
                      },
                      '& .icon': {
                        transform: 'scale(1.1) translateY(-2px)',
                      },
                    },
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255, 255, 255, 0.03)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <CardContent sx={{ 
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    <Box 
                      className="icon"
                      sx={{ 
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        animation: `${glow} 3s ease-in-out infinite`,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 600,
                        color: 'text.primary',
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        opacity: 0.8,
                      }}
                    >
                      {feature.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box 
        component="footer" 
        sx={{
          mt: 'auto',
          py: 4,
          px: 2,
          backgroundColor: 'rgba(26, 35, 50, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
                <img 
                  src="/logo.png" 
                  alt="Screen Pilot" 
                  style={{ height: 40, marginRight: 16 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    Screen Pilot
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    by ACFM
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'center' } }}>
                  <Link href="/about" color="inherit" underline="hover">About</Link>
                  <Link href="/help" color="inherit" underline="hover">Help</Link>
                  <Link href="/privacy" color="inherit" underline="hover">Privacy</Link>
                  <Link href="/terms" color="inherit" underline="hover">Terms</Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Connect With Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <IconButton color="inherit" size="small">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <TwitterIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textAlign: 'center' }}>
            © {new Date().getFullYear()} ACFM Screen Pilot. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}; 