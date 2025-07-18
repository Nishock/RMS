import React, { useState } from 'react';
import { Box, Container, Grid, Card, Typography, Modal, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const handleCardClick = (feature: typeof features[0]) => {
    if (feature.modalType === 'script') {
      setIsScriptModalOpen(true);
    } else if (feature.modalType === 'quiz') {
      setIsQuizModalOpen(true);
    } else if (feature.path) {
      navigate(feature.path);
    }
  };

  const features = [
    {
      title: 'Revise a Topic',
      subtitle: 'Listen to AI-generated podcasts',
      description: 'Learn through audio content tailored to your needs',
      icon: <HeadphonesIcon sx={{ fontSize: 32 }} />,
      color: '#4361EE',
      path: '/student/revise',
      modalType: null
    },
    {
      title: 'Test My Skills',
      subtitle: 'Interactive Quizzes',
      description: 'Challenge yourself with adaptive questions',
      icon: <QuizIcon sx={{ fontSize: 32 }} />,
      color: '#7209B7',
      path: null,
      modalType: 'quiz',
      iframeUrl: 'https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/f57ea786-ad54-4fe5-9d9c-b78b701ad6a1/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false'
    },
    {
      title: 'Generate Assignment',
      subtitle: 'AI-Powered Assignments',
      description: 'Get personalized assignments with instant feedback',
      icon: <AssignmentIcon sx={{ fontSize: 32 }} />,
      color: '#F72585',
      path: '/student/assignments',
      modalType: null
    },
    {
      title: 'Submit Script',
      subtitle: 'Script Analysis',
      description: 'Get professional feedback on your scripts',
      icon: <DescriptionIcon sx={{ fontSize: 32 }} />,
      color: '#10B981',
      path: null,
      modalType: 'script',
      iframeUrl: 'https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/0ee50392-6b9b-461c-9824-1ccf5796d6f6/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=true'
    }
  ];

  const FeatureModal = ({ open, onClose, title, color, iframeUrl }: { 
    open: boolean; 
    onClose: () => void; 
    title: string;
    color: string;
    iframeUrl: string;
  }) => (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        position: 'relative',
        width: '95vw',
        height: '90vh',
        bgcolor: '#1E293B',
        borderRadius: 2,
        boxShadow: 24,
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1,
        }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ height: '100%', pt: '56px' }}>
          <iframe
            src={iframeUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title={title}
          />
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#0F172A',
      p: 3
    }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            color: '#fff',
            mb: 3,
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          Learning Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                onClick={() => handleCardClick(feature)}
                sx={{
                  p: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.06)'
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5
                }}>
                  <Box sx={{ 
                    color: feature.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}>
                    {feature.icon}
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#fff',
                        fontWeight: 600
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: feature.color,
                      fontWeight: 500
                    }}
                  >
                    {feature.subtitle}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Script Analysis Modal */}
      <FeatureModal
        open={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        title="Script Analysis"
        color="#10B981"
        iframeUrl={features.find(f => f.modalType === 'script')?.iframeUrl || ''}
      />

      {/* Quiz Modal */}
      <FeatureModal
        open={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Interactive Quiz"
        color="#7209B7"
        iframeUrl={features.find(f => f.modalType === 'quiz')?.iframeUrl || ''}
      />
    </Box>
  );
}; 