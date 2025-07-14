import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';
const View = () => {
    const location = useLocation();
    const data = location.state || {};
    function formatDateToCustom(input) {
        const date = new Date(input);

        const dayName = date.toLocaleString('en-US', { weekday: 'long' }); // e.g., Friday
        const day = String(date.getDate()).padStart(2, '0');               // e.g., 10
        const monthName = date.toLocaleString('en-US', { month: 'long' }); // e.g., July
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;

        return `${dayName} ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    }




    return (
        <Box sx={{ display: 'flex', margin: 2, flexDirection: "column", gap: 3,mt:8 }}>
            <Paper sx={{display:"flex",alignItems:"center"}}>
                <Typography gutterBottom variant="h6" component="div" sx={{
                    color: 'text.secondary',paddingX:2
                }}>
                    {data.title}
                </Typography>
            </Paper>
            <Paper>
                <Typography gutterBottom variant="p" component="div" sx={{
                    color: 'text.secondary', padding: 1
                }}>
                    <strong>Note Last Updated :</strong> <br />{formatDateToCustom(data.createdAt)}
                </Typography>
                <Typography gutterBottom variant="p" component="div" sx={{
                    color: 'text.secondary', padding: 2,   whiteSpace: 'pre-line'
                }}>
                    {data.content}
                </Typography>
            </Paper>
        </Box>
    )
}

export default View