import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('https://skynote-api.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.status === 200) {
        setToast({
          open: true,
          message: 'Login successful!',
          severity: 'success',
        });

        // Store token in localStorage (optional)
        localStorage.setItem('jwt', result.userToken);

        setTimeout(() => navigate('/home'), 1000);
      } else {
        setToast({
          open: true,
          message: result.message || 'Login failed',
          severity: 'error',
        });
      }
    } catch (err) {
      setToast({
        open: true,
        message: 'Network error',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'text.secondary',
        userSelect: 'none',
      }}
    >
      <Typography variant="h5" sx={{ marginY: 3, fontWeight: 'bold' }}>
        Log in to <span style={{ color: '#1976d2' }}>SkyNote</span>
      </Typography>

      <Paper
        elevation={3}
        sx={{
          minHeight: 220,
          marginX: 2,
          padding: 3,
          width: '90%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="username"
          label="Username"
          variant="standard"
          type="text"
          fullWidth
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
            pattern: {
              value: /^\S+$/,
              message: 'Username cannot contain spaces',
            },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          fullWidth
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
          <Button type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>

      <Typography
        sx={{
          marginTop: 2,
          fontSize: '0.92rem',
          textAlign: 'center',
        }}
      >
        Don&apos;t have an account?{' '}
        <span
          onClick={() => navigate('/signup')}
          style={{
            cursor: 'pointer',
            color: '#1976d2',
            userSelect: 'none',
          }}
        >
          Sign Up
        </span>
      </Typography>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          variant='filled'
          sx={{ width: '100%',mt:3 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LogIn;
