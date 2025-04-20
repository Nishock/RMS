import React from 'react';
import { Box, Paper } from '@mui/material';

export const ScriptAnalysis: React.FC = () => {
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
        <iframe
          src="https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/0ee50392-6b9b-461c-9824-1ccf5796d6f6/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=true"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Script Analysis"
        />
      </Paper>
    </Box>
  );
}; 