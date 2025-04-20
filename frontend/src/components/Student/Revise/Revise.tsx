import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const Revise: React.FC = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(26, 35, 50, 0.95)',
      }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 600 }}>
            Revise a Topic
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Podcast
          </Typography>
        </Container>
      </Box>
      
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <iframe
          src="https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/f57ea786-ad54-4fe5-9d9c-b78b701ad6a1/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          title="Revise Agent"
        />
      </Box>
    </Box>
  );
}; 