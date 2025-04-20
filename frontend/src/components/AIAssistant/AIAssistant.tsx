import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { User } from '../../types';

interface AIAssistantProps {
  user: User;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ user }) => {
  const getAssistantUrl = () => {
    if (user.role === 'teacher') {
      return 'https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/fa35cb15-8a38-4fb8-ad85-82d6dc7c8d15/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false';
    } else if (user.role === 'student') {
      return 'https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/f57ea786-ad54-4fe5-9d9c-b78b701ad6a1/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false';
    }
    return '';
  };

  return (
    <Box sx={{ height: 'calc(100vh - 128px)' }}>
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {getAssistantUrl() ? (
          <iframe
            src={getAssistantUrl()}
            width="100%"
            height="100%"
            frameBorder="0"
            title="AI Assistant"
          />
        ) : (
          <Typography variant="h6" sx={{ p: 3 }}>
            AI Assistant not available for this role
          </Typography>
        )}
      </Paper>
    </Box>
  );
}; 