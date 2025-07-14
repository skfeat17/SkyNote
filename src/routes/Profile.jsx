import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Divider,
  Stack,
  Button,
  Skeleton,
  Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const res = await fetch('https://skynote-api.vercel.app/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.name) {
          setUser({
            name: data.name,
            username: data.username,
            totalNotes: data.totalNotes,
            joinedOn: new Date(data.joinedAt).toLocaleDateString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.name
            )}&background=random&color=fff&size=200`,
          });
        } else {
          throw new Error(data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
          borderRadius: 3,
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="circular" width={150} height={150} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton height={30} sx={{ mb: 2 }} />
            <Skeleton height={20} />
            <Skeleton height={20} sx={{ mt: 1 }} />
            <Skeleton height={20} sx={{ mt: 1 }} />
            <Skeleton height={40} sx={{ mt: 2 }} />
          </>
        ) : error ? (
          <Alert severity="error" variant="filled">{error}</Alert>
        ) : (
          <>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
            />

            <Typography variant="h5" color="textSecondary" sx={{ textAlign: "center" }} fontWeight="bold" gutterBottom>
              {user.name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={1} alignItems="center" justifyContent="start">
              <AccountCircleIcon color="primary" />
              <Typography color="primary" fontWeight="bold" variant="subtitle2">USERNAME</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>{user.username}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }} justifyContent="start">
              <NotesIcon color="primary" />
              <Typography color="primary" fontWeight="bold" variant="subtitle2">TOTAL NOTES</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>{user.totalNotes}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }} justifyContent="start">
              <CalendarTodayIcon color="primary" />
              <Typography color="primary" fontWeight="bold" variant="subtitle2">JOINED ON</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>{user.joinedOn}</Typography>
            </Stack>

            <Button
              variant="text"
              color="error"
              startIcon={<LogoutIcon />}
              sx={{ mt: 1 }}
              onClick={() => {
                localStorage.removeItem('jwt');
                window.location.href = '/';
              }}
            >
              Log Out
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};
