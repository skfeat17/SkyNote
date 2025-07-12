import React from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Divider,
  Stack,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';

export const Profile = () => {
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    totalNotes: 12,
    joinedOn: '2024-05-10',
    avatar: 'https://i.pravatar.cc/200', // Random avatar generator
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        {/* Avatar */}
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
        />

        {/* Name */}
        <Typography variant="h5" color="textSecondary"   sx={{ textAlign:"center"}} fontWeight="bold" gutterBottom>
          {user.name}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Username */}
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="start">
          <AccountCircleIcon color="primary" />
          <Typography color="primary"  fontWeight="bold" variant="subtitle2">USERNAME</Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>{user.username}</Typography>
        </Stack>

        {/* Notes Count */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }} justifyContent="start">
          <NotesIcon color="primary" />
          <Typography color="primary"  fontWeight="bold" variant="subtitle2">Notes</Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>{user.totalNotes}</Typography>
        </Stack>

        {/* Joined On */}
        <Stack direction="row" spacing={1} alignItems="center"  sx={{ mt: 1 }} justifyContent="start">
          <CalendarTodayIcon color="primary" />
          <Typography color="primary"  fontWeight="bold" variant="subtitle2">Joined On</Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>{user.joinedOn}</Typography>
        </Stack>

        {/* Logout Button */}
        <Button
          variant="text"
          color="error"

          startIcon={<LogoutIcon />}
          sx={{ mt: 1 ,justifySelf:'start'}}
          onClick={() => alert('Logged out!')}
        >
          Log Out
        </Button>
      </Paper>
    </Box>
  );
};
