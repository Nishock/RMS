import React, { useState } from 'react';
import { Box, Container, Typography, Card, CircularProgress, Fade } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

export const ScriptAnalyzer: React.FC = () => {
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
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <DescriptionIcon sx={{ 
                fontSize: 40, 
                color: '#10B981',
                background: 'rgba(16, 185, 129, 0.1)',
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
                Script Analyzer
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
              Upload your scripts and get instant AI-powered analysis, suggestions, and improvements. 
              Perfect your writing with detailed feedback on structure, clarity, and style.
            </Typography>
          </Box>
        </Fade>

        {/* Script Analyzer Content */}
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
                    color: '#10B981',
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
                  Loading Script Analyzer...
                </Typography>
              </Box>
            )}
            <iframe
              src="https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/0ee50392-6b9b-461c-9824-1ccf5796d6f6/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=true"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Script Analyzer AI Agent"
              onLoad={() => setIsLoading(false)}
            />
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}; 