import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

export const Terms: React.FC = () => {
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
          Terms of Service
        </Typography>
        
        <Box sx={{ '& > *': { mb: 4 } }}>
          <section>
            <Typography variant="h5" gutterBottom>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing and using Screen Pilot, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the service.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              2. User Accounts
            </Typography>
            <Typography variant="body1" paragraph>
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              3. Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              The content, features, and functionality of Screen Pilot are owned by ACFM and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              4. User Content
            </Typography>
            <Typography variant="body1" paragraph>
              By submitting content to Screen Pilot, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content for the purpose of providing and improving our services.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              5. Acceptable Use
            </Typography>
            <Typography variant="body1" paragraph>
              You agree not to:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1">Use the service for any unlawful purpose</Typography>
              <Typography component="li" variant="body1">Share your account credentials with others</Typography>
              <Typography component="li" variant="body1">Attempt to gain unauthorized access to any part of the service</Typography>
              <Typography component="li" variant="body1">Use the service to transmit harmful code or malware</Typography>
            </Box>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              6. Termination
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              7. Changes to Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify or replace these terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
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