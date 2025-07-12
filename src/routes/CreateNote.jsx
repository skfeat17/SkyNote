import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {

  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Create a New Note</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        variant="outlined"
        multiline
        rows={8}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Note
      </Button>
    </Box>
  );
};

export default CreateNote;
