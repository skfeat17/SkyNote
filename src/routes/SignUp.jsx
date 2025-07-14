import { JoinFullTwoTone } from '@mui/icons-material';
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const fields = [
    { label: "Enter Name", id: "name", type: "text", btnText: "Next" },
    { label: "Set Username", id: "username", type: "text", btnText: "Next" },
    { label: "Set Password", id: "password", type: "password", btnText: "Submit" }
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const currentField = fields[step];

  const handleNext = async () => {
    const value = formData[currentField.id].trim();

    // Validation
    if (value === "") {
      setError(`${currentField.label} cannot be empty`);
      return;
    }

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

    if (currentField.id === "password" && value.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    if (step < fields.length - 1) {
      setStep(prev => prev + 1);
    } else {
      // Final submission
      setLoading(true);
      try {
        const res = await fetch("https://skynote-api.vercel.app/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.status === 200) {
          setToast({ open: true, message: "Sign up successful!", severity: "success" });
          setTimeout(() => navigate('/home'), 1000);
          
          localStorage.setItem("jwt",data.userToken)
        } else {
          setToast({ open: true, message: data.message || "Signup failed", severity: "error" });
        }
      } catch (err) {
        setToast({ open: true, message: "Network error", severity: "error" });
      } finally {
        setLoading(false);
      }
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
        height: "100vh",
        width: '100vw',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "column",
        color: 'text.secondary',
        userSelect: 'none'
      }}
    >
      <Typography variant="h5" sx={{ marginY: 3, fontWeight: "bold" }}>
        Sign Up on <span style={{ color: '#1976d2' }}>SkyNote</span>
      </Typography>

      <Paper
        elevation={3}
        sx={{
          minHeight: 260,
          marginX: 2,
          padding: 3,
          width: '90%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: "column",
          gap: 2
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

        {step === 2 && (
          <Typography variant="caption" color="error" mt={2}>
            ⚠️ Your password is never stored in readable form. If you forget it, your notes cannot be recovered.
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <Button variant="outlined" onClick={handlePrev} disabled={step === 0}>
            Prev
          </Button>
          <Button variant="contained" onClick={handleNext} disabled={loading}>
            {loading ? "Submitting..." : currentField.btnText}
          </Button>
        </Box>
      </Paper>

      <Typography sx={{ marginTop: 2, fontSize: '0.92rem', textAlign: 'center' }}>
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          style={{
            cursor: 'pointer',
            color: '#1976d2'
          }}
        >
          Log In
        </span>
      </Typography>

      {/* Toast */}
      <Snackbar
      
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert      variant='filled' onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%',mt:3 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;
