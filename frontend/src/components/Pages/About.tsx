import React from 'react';
import { Box, Container, Typography, Paper, Grid, Fade } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { commonStyles, gradients, animations } from '../../styles/shared';

export const About: React.FC = () => {
  const features = [
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
      title: "Interactive Learning",
      description: "AI-generated podcasts for immersive topic revision"
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: "Adaptive Assessment",
      description: "Dynamic quizzes that evolve with your understanding"
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: "Smart Assignments",
      description: "Automated assignment generation and detailed feedback"
    },
    {
      icon: <MovieFilterIcon sx={{ fontSize: 40 }} />,
      title: "Script Analysis",
      description: "Advanced script review and improvement suggestions"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Fade in timeout={800}>
        <Paper 
          sx={{ 
            ...commonStyles.card,
            p: { xs: 3, md: 6 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              background: gradients.primary,
              borderRadius: '50%',
              filter: 'blur(100px)',
              opacity: 0.1,
              animation: `${animations.pulse} 10s ease-in-out infinite`,
            }}
          />

          <Box sx={{ position: 'relative' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{
                ...commonStyles.gradientText,
                fontWeight: 700,
                mb: 3,
              }}
            >
              About Screen Pilot
            </Typography>

            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                color: 'text.secondary',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                maxWidth: 800,
              }}
            >
              Screen Pilot is an innovative AI-powered learning platform developed by Annapurna College of Film and Media (ACFM). Our mission is to provide students with cutting-edge tools and resources to enhance their learning experience in film and media studies.
            </Typography>

            <Box sx={{ my: 6 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  fontWeight: 600,
                  background: gradients.secondary,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Key Features
              </Typography>

              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Fade in timeout={1000 + (index * 200)}>
                      <Paper
                        sx={{
                          p: 3,
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            background: 'rgba(255, 255, 255, 0.05)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: '12px',
                              background: gradients.primary,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                              animation: `${animations.float} 3s ease-in-out infinite`,
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              background: gradients.primary,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {feature.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.6,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Paper>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                color: 'text.secondary',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                maxWidth: 800,
              }}
            >
              Our platform combines the expertise of ACFM's educational experience with state-of-the-art artificial intelligence to create a unique and effective learning environment.
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}; 