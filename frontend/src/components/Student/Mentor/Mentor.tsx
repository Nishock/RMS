import React, { useState } from 'react';
import { Box, Container, Typography, Card, CircularProgress, Fade, Grid, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

export const Mentor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      color: '#fff',
      py: 4,
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Fade in timeout={1000}>
          <Box sx={{ 
            mb: 4,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200%',
              height: '200px',
              background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0) 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <SchoolIcon sx={{ 
                fontSize: 40, 
                color: '#4F46E5',
                background: 'rgba(79, 70, 229, 0.1)',
                p: 1,
                borderRadius: '12px'
              }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI Mentor
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '800px',
                lineHeight: 1.6,
              }}
            >
              Your personal AI mentor is here to guide you through your learning journey. 
              Get instant help with your studies, receive personalized explanations, and explore topics in depth.
            </Typography>
          </Box>
        </Fade>

        {/* Mentor Content */}
        <Fade in timeout={1200}>
          <Grid container spacing={3}>
            {/* Main Chat Area */}
            <Grid item xs={12} md={8}>
              <Card sx={{ 
                position: 'relative',
                height: 'calc(100vh - 250px)',
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
              }}>
                {isLoading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(15, 23, 42, 0.9)',
                      zIndex: 10,
                    }}
                  >
                    <CircularProgress
                      size={60}
                      thickness={4}
                      sx={{
                        color: '#4F46E5',
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    >
                      Connecting to your AI Mentor...
                    </Typography>
                  </Box>
                )}
                <iframe
                  src="https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/0ee50392-6b9b-461c-9824-1ccf5796d6f6/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Ask+your+mentor...&hide_logo=true"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  title="AI Mentor"
                  onLoad={() => setIsLoading(false)}
                />
              </Card>
            </Grid>

            {/* Sidebar with Resources */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ 
                p: 3,
                height: 'calc(100vh - 250px)',
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                overflowY: 'auto',
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
                  Learning Resources
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Study Materials', 'Practice Questions', 'Video Tutorials', 'Past Discussions'].map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        background: 'rgba(79, 70, 229, 0.1)',
                        border: '1px solid rgba(79, 70, 229, 0.2)',
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          background: 'rgba(79, 70, 229, 0.2)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      <Typography sx={{ color: '#fff' }}>{item}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
}; 