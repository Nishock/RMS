import React, { useState } from 'react';
import { Box, Container, Typography, Paper, CircularProgress, Fade } from '@mui/material';
import { commonStyles, animations, gradients } from '../../../styles/shared';

export const Quiz: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)', 
      display: 'flex', 
      flexDirection: 'column',
      background: gradients.dark,
    }}>
      <Fade in timeout={800}>
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(26, 35, 50, 0.95)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: gradients.primary,
            opacity: 0.1,
          },
        }}>
          <Container maxWidth="xl">
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'text.primary', 
                fontWeight: 600,
                position: 'relative',
                display: 'inline-block',
                ...commonStyles.gradientText,
              }}
            >
              Test My Skills
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary', 
                mt: 1,
                position: 'relative',
                maxWidth: '600px',
              }}
            >
              Challenge yourself with AI-generated questions that adapt to your knowledge level. 
              Master any topic through interactive quizzes and real-time feedback.
            </Typography>
          </Container>
        </Box>
      </Fade>
      
      <Box sx={{ flexGrow: 1, position: 'relative', p: 2 }}>
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(26, 35, 50, 0.9)',
              zIndex: 10,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  color: 'primary.main',
                  animation: `${animations.pulse} 2s ease-in-out infinite`,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  ...commonStyles.gradientText,
                }}
              >
                Preparing your quiz...
              </Typography>
            </Box>
          </Box>
        )}
        <Paper
          sx={{
            height: '100%',
            ...commonStyles.card,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <iframe
            src="https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/f57ea786-ad54-4fe5-9d9c-b78b701ad6a1/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="Quiz Agent"
            onLoad={() => setIsLoading(false)}
          />
        </Paper>
      </Box>
    </Box>
  );
}; 