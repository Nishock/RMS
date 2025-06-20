import React, { useState } from 'react';
import { Box, Container, Typography, Card, CircularProgress, Fade } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

export const Quiz: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      color: '#fff',
      py: 4,
    }}>
      {/* Header */}
      <Container maxWidth="xl">
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
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <QuizIcon sx={{ 
                fontSize: 40, 
                color: '#8B5CF6',
                background: 'rgba(139, 92, 246, 0.1)',
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
                Interactive Quiz
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
              Challenge yourself with AI-generated questions that adapt to your knowledge level. 
              Get instant feedback and track your progress in real-time.
            </Typography>
          </Box>
        </Fade>

        {/* Quiz Content */}
        <Fade in timeout={1200}>
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
                    color: '#8B5CF6',
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
                  Preparing your quiz...
                </Typography>
              </Box>
            )}
            <iframe
              src="https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/f57ea786-ad54-4fe5-9d9c-b78b701ad6a1/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Quiz AI Agent"
              onLoad={() => setIsLoading(false)}
            />
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}; 