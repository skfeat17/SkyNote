import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const fields = [
    { label: "Name", id: "name", type: "text", btnText: "Next" },
    { label: "Username", id: "username", type: "text", btnText: "Next" },
    { label: "Password", id: "password", type: "password", btnText: "Submit" }
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const currentField = fields[step];

  const handleNext = () => {
    const value = formData[currentField.id].trim();
  
    // Check if field is empty
    if (value === "") {
      setError(`${currentField.label} cannot be empty`);
      return;
    }
  
    // Additional validation for username
    if (currentField.id === "username") {
      if (value.includes(" ")) {
        setError("Username cannot contain spaces");
        return;
      }
      if (value.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }
    }
  
    // Additional validation for password
    if (currentField.id === "password" && value.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
  
    // Clear error and move to next step or submit
    setError("");
  
    if (step < fields.length - 1) {
      setStep(prev => prev + 1);
    } else {
      console.log("✅ Form submitted with data:", formData);
      alert("Form submitted! Check console.");
    }
  };
  

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
      setError(""); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [currentField.id]: e.target.value });
  };

  return (
    <Box
    
      sx={{
        display: 'flex',
        height: "85vh",
        width: '100vw',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "column",
        color:'text.secondary',
        userSelect:'none'

      }}
    >
      <Typography variant="h5" sx={{ marginY: 3, fontWeight: "bold" }}>
        Sign Up on <span style={{color:'#1976d2'}}> SkyNote</span> 
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
          flexDirection: "column",
          gap: 2,
          color:'text.secondary'

        }}
      >
        <Typography variant="h6">{currentField.label}</Typography>
        <TextField
          id={currentField.id}
          label={currentField.label}
          variant="standard"
          type={currentField.type}
          value={formData[currentField.id]}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <Button variant="outlined" color="primary" onClick={handlePrev} disabled={step === 0}>
            Prev
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {currentField.btnText}
          </Button>
        </Box>
      </Paper>
       <Typography sx={{ marginTop: 2 ,fontSize:'0.92rem',textAlign:'center'}}>
         Already have an account?{' '}
         <span
           onClick={() => navigate('/login')}
           style={{
             cursor: 'pointer',
             color: '#1976d2',
             userSelect: 'none'
           }}
         >
           Log In
         </span>
       </Typography>
    </Box>
  );
};

export default SignUp;
