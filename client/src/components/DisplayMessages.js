import React from 'react'
import Message from './Message'
import {Button, TextField, Container, Grid, List, Paper } from '@mui/material';

const DisplayMessages = (props) => {
  return (
    <Container>
        <Paper style={{maxHeight: 400, padding: 5, overflow: 'auto'}}>
            <List>
                {
                    props.messages.map((msg, index) => {
                        return <Message key={index + msg.username} message={msg} username={props.username} />
                    })
                }
            </List>
        </Paper>
        <form onSubmit={e => {
            e.preventDefault();
            props.handleMessage();
        }}>
        <Grid sx={{position: 'fixed', bottom: 0, marginBottom: 2}} container rowSpacing={1}>
            <Grid item xs={6} md={6}><TextField sx={{minWidth: "100%"}} variant="outlined" label='message' value={props.message} onChange={e => props.setMessage(e.target.value)} /></Grid>
            <Grid item xs={2}><Button  sx={{marginLeft: 2, padding: 2}} variant="contained" type="submit">Send</Button></Grid>
        </Grid>
        </form>

    </Container>
  )
}

export default DisplayMessages