import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

export const Privacy: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper 
        sx={{ 
          p: 4,
          background: 'rgba(26, 35, 50, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Box sx={{ '& > *': { mb: 4 } }}>
          <section>
            <Typography variant="h5" gutterBottom>
              1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We collect information that you provide directly to us, including your name, email address, and academic information. We also collect data about your interactions with our platform to improve your learning experience.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect to:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1">Provide and improve our services</Typography>
              <Typography component="li" variant="body1">Personalize your learning experience</Typography>
              <Typography component="li" variant="body1">Communicate with you about your account</Typography>
              <Typography component="li" variant="body1">Monitor and analyze trends and usage</Typography>
            </Box>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              3. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              4. Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              You have the right to:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1">Access your personal data</Typography>
              <Typography component="li" variant="body1">Correct inaccurate data</Typography>
              <Typography component="li" variant="body1">Request deletion of your data</Typography>
              <Typography component="li" variant="body1">Object to data processing</Typography>
            </Box>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              5. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about this Privacy Policy, please contact us at privacy@acfm.edu
            </Typography>
          </section>
        </Box>

        <Typography variant="caption" sx={{ display: 'block', mt: 4, color: 'text.secondary' }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Paper>
    </Container>
  );
}; 