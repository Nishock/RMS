import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box,
  Fade,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { commonStyles, gradients, animations } from '../../styles/shared';

export const Help: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "How do I use the Revision feature?",
      answer: "The Revision feature allows you to learn about any topic through an interactive AI-powered conversation. Simply click on 'Revise a Topic' from your dashboard, type in your topic of interest, and the AI will generate a podcast-style explanation."
    },
    {
      question: "How does the Quiz system work?",
      answer: "The Quiz feature adapts to your knowledge level. Select 'Test My Skills' from the dashboard, choose your topic, and the AI will generate questions to test your understanding. The questions become progressively more challenging as you answer correctly."
    },
    {
      question: "How do I submit an assignment?",
      answer: "Click on 'Generate and Submit Assignment' from your dashboard. You can either request the AI to generate a new assignment or submit an existing one for feedback. Follow the prompts to upload your work and receive detailed analysis."
    },
    {
      question: "What type of scripts can I submit for feedback?",
      answer: "You can submit any type of script - screenplays, short films, documentaries, or TV episodes. The AI will analyze your script's structure, character development, dialogue, and provide constructive feedback for improvement."
    },
    {
      question: "How can I track my progress?",
      answer: "Your progress is automatically tracked across all features. You can view your quiz scores, assignment feedback history, and script improvement suggestions from your profile section."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Fade in timeout={800}>
        <Paper 
          sx={{ 
            ...commonStyles.card,
            p: 4,
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <HelpOutlineIcon 
                sx={{ 
                  fontSize: 40, 
                  mr: 2,
                  animation: `${animations.float} 3s ease-in-out infinite`,
                  background: gradients.primary,
                  borderRadius: '50%',
                  p: 1,
                  color: 'white',
                }} 
              />
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{
                  ...commonStyles.gradientText,
                  fontWeight: 700,
                }}
              >
                Help Center
              </Typography>
            </Box>

            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: 600,
              }}
            >
              Find answers to commonly asked questions about Screen Pilot's features and functionality.
            </Typography>

            <Box sx={{ mt: 4 }}>
              {faqs.map((faq, index) => (
                <Fade in timeout={800 + (index * 200)} key={`faq-${index}`}>
                  <Accordion 
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      color: 'text.primary',
                      borderRadius: '8px !important',
                      mb: 2,
                      '&:before': {
                        display: 'none',
                      },
                      '&.Mui-expanded': {
                        margin: '8px 0',
                        background: 'rgba(255, 255, 255, 0.05)',
                      },
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon 
                          sx={{ 
                            color: 'primary.main',
                            transition: 'transform 0.3s ease',
                            transform: expanded === `panel${index}` ? 'rotate(180deg)' : 'rotate(0)',
                          }} 
                        />
                      }
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          margin: '12px 0',
                        },
                      }}
                    >
                      <Typography 
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: expanded === `panel${index}` ? 'primary.main' : 'text.primary',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        p: 3,
                      }}
                    >
                      <Typography 
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Fade>
              ))}
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}; 