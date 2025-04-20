import { keyframes } from '@mui/material';

export const animations = {
  float: keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `,
  glow: keyframes`
    0% { box-shadow: 0 0 5px rgba(104, 95, 255, 0.2); }
    50% { box-shadow: 0 0 20px rgba(104, 95, 255, 0.4); }
    100% { box-shadow: 0 0 5px rgba(104, 95, 255, 0.2); }
  `,
  shimmer: keyframes`
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  `,
  pulse: keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `
};

export const glassmorphism = {
  background: 'rgba(26, 35, 50, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

export const gradients = {
  primary: 'linear-gradient(135deg, #685FFF 0%, #FF4B4B 100%)',
  secondary: 'linear-gradient(135deg, #00B4D8 0%, #4CAF50 100%)',
  accent: 'linear-gradient(135deg, #FFD700 0%, #FF4B4B 100%)',
  dark: 'linear-gradient(135deg, rgba(26, 35, 50, 0.95) 0%, rgba(26, 35, 50, 0.8) 100%)',
};

export const shadows = {
  card: '0 8px 32px rgba(0, 0, 0, 0.1)',
  button: '0 4px 12px rgba(104, 95, 255, 0.2)',
  hover: '0 12px 40px rgba(104, 95, 255, 0.3)',
};

export const transitions = {
  smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const commonStyles = {
  card: {
    ...glassmorphism,
    boxShadow: shadows.card,
    transition: transitions.smooth,
    '&:hover': {
      boxShadow: shadows.hover,
      transform: 'translateY(-5px)',
    },
  },
  gradientText: {
    background: gradients.primary,
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  button: {
    background: gradients.primary,
    boxShadow: shadows.button,
    transition: transitions.bounce,
    '&:hover': {
      boxShadow: shadows.hover,
      transform: 'translateY(-2px)',
    },
  },
  shimmerEffect: {
    background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
    backgroundSize: '2000px 100%',
    animation: `${animations.shimmer} 2s linear infinite`,
  },
}; 