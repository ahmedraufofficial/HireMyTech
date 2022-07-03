import React from 'react'
import { Grid, ListItemText } from '@mui/material';

const Message = (props) => {
    const requestMessage = props.message.username !== props.username;
    const sender = {
        width: '100%', 
        maxWidth: 360, 
        bgcolor: '#757ce8', 
        padding: 2,
        borderRadius: 5
    }
    const receiver = {
        width: '100%', 
        maxWidth: 360, 
        bgcolor: '#ff7961', 
        padding: 2,
        borderRadius: 5
    }

    return (
        requestMessage ? (
        <Grid container direction="row" justifyContent="flex-start" alignItems="stretch">     
            <ListItemText sx={sender} primary={props.message.message} secondary={props.message.username + " - " + new Date().toLocaleString('en-US', { timeZone: 'UTC' })} />
        </Grid>
    ) : (
        <Grid container direction="row" justifyContent="flex-end" alignItems="stretch">    
            <ListItemText sx={receiver} primary={props.message.message} secondary={props.message.username + " - " + new Date().toLocaleString('en-US', { timeZone: 'UTC' })} />
        </Grid>
    )

     
    )
}

export default Message