import React, { useState } from 'react';
import { Box, Container, Grid, Card, Typography, Modal, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const handleCardClick = (feature: typeof features[0]) => {
    if (feature.modalType === 'assignment') {
      setIsAssignmentModalOpen(true);
    } else if (feature.path) {
      navigate(feature.path);
    }
  };

  const features = [
    {
      title: 'Revise a Topic',
      subtitle: 'Listen to AI-generated podcasts',
      description: 'Create audio content tailored to student needs',
      icon: <HeadphonesIcon sx={{ fontSize: 32 }} />,
      color: '#4361EE',
      textColor: '#60A5FA',
      path: '/teacher/revise',
      modalType: null
    },
    {
      title: 'Test Creation',
      subtitle: 'Interactive Quizzes',
      description: 'Create adaptive questions and assessments',
      icon: <QuizIcon sx={{ fontSize: 32 }} />,
      color: '#7209B7',
      textColor: '#9333EA',
      path: '/teacher/quiz',
      modalType: null
    },
    {
      title: 'Generate Assignment',
      subtitle: 'AI-Powered Assignments',
      description: 'Create personalized assignments with instant feedback',
      icon: <AssignmentIcon sx={{ fontSize: 32 }} />,
      color: '#F72585',
      textColor: '#EC4899',
      path: null,
      modalType: 'assignment',
      iframeUrl: 'https://app.relevanceai.com/agents/d7b62b/5cc7752400a6-4648-b47b-04fc92b47cae/fa35cb15-8a38-4fb8-ad85-82d6dc7c8d15/share?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false'
    },
    {
      title: 'Review Scripts',
      subtitle: 'Script Analysis',
      description: 'Review and provide feedback on student scripts',
      icon: <DescriptionIcon sx={{ fontSize: 32 }} />,
      color: '#10B981',
      textColor: '#34D399',
      path: '/teacher/scripts',
      modalType: null
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
            mb: 4,
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
                  height: '100%',
                  bgcolor: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    bgcolor: 'rgba(15, 23, 42, 0.8)',
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  gap: 2
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Box
                      sx={{
                        color: feature.color,
                        bgcolor: `${feature.color}15`,
                        p: 1,
                        borderRadius: '12px',
                      }}
                    >
                      {feature.icon}
                    </Box>
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
                    variant="subtitle1"
                    sx={{
                      color: feature.textColor,
                      fontWeight: 500
                    }}
                  >
                    {feature.subtitle}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      flex: 1
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

      {/* Assignment Generation Modal */}
      <FeatureModal
        open={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        title="Generate Assignment"
        color="#F72585"
        iframeUrl={features.find(f => f.modalType === 'assignment')?.iframeUrl || ''}
      />
    </Box>
  );
}; 