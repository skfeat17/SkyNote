import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Card,
  CardActions,
  Typography,
  Button,
  CardContent,
  Stack,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
  Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Notes = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const fetchNotes = async () => {
    setLoading(true);
    const token = localStorage.getItem('jwt');

    try {
      const res = await fetch('https://skynote-api.vercel.app/note/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
         const sorted = data.notes.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  setNotes(sorted);
  setFilteredNotes(sorted);
      } else {
        throw new Error(data.message || 'Failed to fetch notes');
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch, notes]);

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    const token = localStorage.getItem('jwt');

    try {
      const res = await fetch('https://skynote-api.vercel.app/note/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: deleteId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSnackbar({ open: true, message: 'Note deleted successfully!', severity: 'success' });
        setDeleteId(null);
        fetchNotes(); zz
      } else {
        throw new Error(data.message || 'Failed to delete note');
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  function formatDateToCustom(input) {
    const date = new Date(input);
  
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = date.toLocaleString('en-US', { month: 'short' }); // e.g., Jul
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12;
  
    return `${hours}:${minutes} ${ampm} ${day} ${monthName} ${year.toString().slice(2,4)}`;
  }
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, mb: 8, px: 1 }}>
      <Box sx={{ position: 'sticky', top: 45, bgcolor: '#fff', zIndex: 10, pt: 2, width: '100%' }}>
        {loading ? (
          <Skeleton height={40} />
        ) : (
          <TextField
            label="Search Note"
            variant="outlined"
            size="small"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, width: '100%' }}>
  {loading
    ? Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height={180} variant="rectangular" />
      ))
    : filteredNotes.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 30, textAlign: 'center' }}>
          No Notes Exist
        </Typography>
      ) : (
        filteredNotes.map((data) => (
          <Card
            key={data.id}
            sx={{
              width: '100%',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 1,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  fontSize: '1.2rem',
                  fontWeight:'bold'
                }}
              >
                {data.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'pre-line',
                  fontSize: '1.1rem',
                }}
              >
                {data.content}
              </Typography>
            </CardContent>

            <CardActions
              sx={{
                mt: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                pb: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary" fontSize={"1rem"}>
                {formatDateToCustom(data.createdAt)}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Tooltip title="View">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/view', { state: data })}
                    sx={{ minWidth: 10, p: 0.8 }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button
                    size="small"
                    variant="contained"
                    color="info"
                    onClick={() => navigate('/edit', { state: data })}
                    sx={{ minWidth: 10, p: 0.8 }}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Delete">
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteId(data.id)}
                    sx={{ minWidth: 10, p: 0.8 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Stack>
            </CardActions>
          </Card>
        ))
      )}
</Box>


      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => !deleting && setDeleteId(null)}>
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={deleting} variant="contained">
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for toast messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert  sx={{mt:7}}  
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Notes;
