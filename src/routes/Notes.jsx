import React, { useState, useEffect } from 'react';
import { Box, TextField, Card, CardActions, Typography, Button, CardContent, Stack, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './data.json';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Notes = () => {
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(api);

    const navigate = useNavigate();

    const handleView = (note) => {
        navigate("/view", { state: note });
    };

    const handleEdit = (note) => {
        navigate("/edit", { state: note });
    };

    // Debounce logic: wait 300ms before updating search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 300);

        return () => clearTimeout(handler); // cleanup on unmount or next input
    }, [searchText]);

    // Update filtered notes only when debouncedSearch changes
    useEffect(() => {
        setFilteredNotes(
            api.filter(note =>
                note.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
        );
    }, [debouncedSearch]);

    function formatDateToCustom(input) {
        const date = new Date(input);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;
        const hourStr = String(hours).padStart(2, '0');

        return `${day}-${month}-${year} ${hourStr}:${minutes}:${seconds} ${ampm}`;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2, px: 2 }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 10,
                    pt: 2,
                    height: 65,
                    width: '100%',
                    borderBottom: '1px solid #eee',
                }}
            >
                <TextField
                    label="Search Note"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 1, p: 1 }}>
                
            {filteredNotes.length === 0 && (
  <Typography variant="body2" sx={{
    color: 'text.secondary',
mt:30
  }}>
    No Notes Exist
  </Typography>
)}
                
                {filteredNotes.map((data) => (
                    <Card
                        key={data.id}
                        sx={{
                            width: "100%",
                            height: 180,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                            boxShadow: 1,
                            borderRadius: 1,
                        }}
                    >
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" sx={{
                                color: 'text.secondary',
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {data.title}
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {data.content}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", px: 2 }}>
                            <div className="time">
                                {formatDateToCustom(data.createdAt)}
                            </div>
                            <Stack direction="row" spacing={1}>
                                <Tooltip title="View">
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleView(data)}
                                        sx={{ minWidth: '10px', padding: '6px' }}
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Edit">
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="info"
                                        onClick={() => handleEdit(data)}
                                        sx={{ minWidth: '10px', padding: '6px' }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        onClick={() => console.log('Delete', data)}
                                        sx={{ minWidth: '10px', padding: '6px' }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </Button>
                                </Tooltip>
                            </Stack>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Notes;
