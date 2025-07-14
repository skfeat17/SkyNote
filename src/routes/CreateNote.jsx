import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

const CreateNote = () => {
  const [title, setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSave = async () => {
    // Simple validation
    if (!title.trim() || !content.trim()) {
      setToast({ open: true, message: 'All fields are required', severity: 'error' });
      return;
    }

    const token = localStorage.getItem('jwt');
    if (!token) {
      setToast({ open: true, message: 'Missing auth token', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://skynote-api.vercel.app/note/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToast({ open: true, message: 'Note saved!', severity: 'success' });
        setTitle('');
        setContent('');
        // navigate('/notes'); // if you want to redirect
      } else {
        throw new Error(data.message || 'Failed to save note');
      }
    } catch (err) {
      setToast({ open: true, message: err.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" color='text.secondary' sx={{mt:2}}>
        Create a New Note
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!title.trim() && title.length > 0}
        helperText={!title.trim() && title.length > 0 ? 'Title is required' : ''}
      />

      <TextField
        label="Content"
        variant="outlined"
        multiline
        rows={8}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={!content.trim() && content.length > 0}
        helperText={!content.trim() && content.length > 0 ? 'Content is required' : ''}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} /> : null}
      >
        {loading ? 'Saving…' : 'Save Note'}
      </Button>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          variant="filled"
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
          sx={{ width: '100%',mt:7 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateNote;
