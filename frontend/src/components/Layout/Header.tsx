import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { User } from '../../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              sx={{ mr: 2 }}
            >
              {user.name}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="primary"
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}; 