import React,{useEffect} from 'react';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
 useEffect(() => {
    const token = localStorage.getItem("jwt");
    if(token) navigate('/home')
 },[])
 






  return (

    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1,
          padding: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
        Let's start your journey in the sky of productivity
        </Typography>

        <Typography variant="h3" color="primary" fontWeight="bold">
          Sky Note
        </Typography>

        <Box component="img" src={logo} alt="Sky Note Logo" sx={{ width: 300, height: 'auto' }} />

        <Typography variant="subtitle1" color="text.secondary">
        Securely store your <strong>Notes</strong>, <strong>Todos</strong>, and <strong>Passwords</strong> — all in one encrypted space.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
          <Button variant="outlined" color="primary" size="large" onClick={() => navigate('/login')}>
            Log In
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
