import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS

const LogIn = () => {
  const navigate = useNavigate(); // ✅ INITIALIZE IT

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('✅ Form Data:', data);
    alert('Login successful! Check the console for submitted data.');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '80vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'text.secondary',
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
          color: 'text.secondary',
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Paper>

      {/* ✅ Sign-up link with proper navigation */}
      <Typography sx={{ marginTop: 2 ,fontSize:'0.92rem',textAlign:'center'}}>
        Don&apos;t have an account?{' '}
        <span
          onClick={() => navigate('/signup')}
          style={{
            cursor: 'pointer',
            color: '#1976d2',
            userSelect: 'none'
          }}
        >
          Sign Up
        </span>
      </Typography>
    </Box>
  );
};

export default LogIn;
