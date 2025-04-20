import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../types';

const drawerWidth = 280;

interface SidebarProps {
  user: User | null;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const adminNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Teachers',
      path: '/admin/teachers',
      icon: <PeopleIcon />,
    },
    {
      title: 'Students',
      path: '/admin/students',
      icon: <SchoolIcon />,
    },
    {
      title: 'Reports',
      path: '/admin/reports',
      icon: <AssessmentIcon />,
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: <SettingsIcon />,
    },
  ];

  const teacherNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      path: '/teacher/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'AI Assistant',
      path: '/teacher/ai-assistant',
      icon: <AssessmentIcon />,
    },
  ];

  const studentNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      path: '/student/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Script Analysis',
      path: '/student/script-analysis',
      icon: <AssessmentIcon />,
    },
    {
      title: 'AI Assistant',
      path: '/student/ai-assistant',
      icon: <SchoolIcon />,
    },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminNavItems;
      case 'teacher':
        return teacherNavItems;
      case 'student':
        return studentNavItems;
      default:
        return [];
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {getNavItems().map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                mx: 2,
                borderRadius: 2,
                backgroundColor: location.pathname === item.path ? 
                  `${theme.palette.primary.main}15` : 'transparent',
                color: location.pathname === item.path ?
                  theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}10`,
                },
              }}
            >
              <ListItemIcon sx={{
                color: location.pathname === item.path ?
                  theme.palette.primary.main : theme.palette.text.primary,
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Drawer>
  );
}; 