import React, { useRef, useState } from 'react';
import { Box, Paper, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const titleRef = useRef();
  const contentRef = useRef();
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const formatDateToCustom = (input) => {
    const date = new Date(input);
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${dayName} ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleUpdate = async () => {
    const title = titleRef.current?.innerText.trim();
    const content = contentRef.current?.innerText.trim();
    if (!title || !content) {
      setSnackbar({ open: true, message: "Title and content cannot be empty", severity: "error" });
      return;
    }

    const token = localStorage.getItem("jwt");
    try {
      setLoading(true);
      const res = await fetch('https://skynote-api.vercel.app/note/put', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: data.id, title, content })
      });

      const result = await res.json();
      if (res.status === 200) {
        setSnackbar({ open: true, message: "Note updated successfully!", severity: "success" });
        setTimeout(() => navigate('/home'), 1000);
    
    } else {
        setSnackbar({ open: true, message: result.message || "Update failed", severity: "error" });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', margin: 2, flexDirection: "column", gap: 3, mt: 8 }}>
      <Paper>
        <Typography
          ref={titleRef}
          gutterBottom
          variant="h6"
          contentEditable={true}
          component="div"
          sx={{ color: 'text.secondary', paddingX: 2 }}
        >
          {data.title}
        </Typography>
      </Paper>

      <Paper>
        <Typography
          ref={contentRef}
          gutterBottom
          variant="body1"
          component="div"
          contentEditable={true}
          sx={{ color: 'text.secondary', padding: 2 }}
        >
          {data.content}
        </Typography>
      </Paper>

      <Button variant="contained" color="primary" onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Note"}
      </Button>

      <Snackbar
   
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical:'top', horizontal: 'center' }}
      >
        <Alert      sx={{mt:7}}  onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Edit;
