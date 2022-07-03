import React from 'react';
import User from './User';
import { Typography, List, Container, Box } from '@mui/material';

const ActiveUsers = (props) => {
    return (
        <Container sx={{ marginBottom: 2}}>
            <Typography variant='h5'>
                Active users
            </Typography>
            <Box sx={{maxHeight: 40, padding: 1, overflow: 'auto', borderColor: 'primary.main', border: 1, borderRadius: 1}}>
                <List sx={{ width: '100%', maxWidth: 150 }}>
                    {props.activeUsers.map(user => {
                        return (<User key={user.id} user={user} />)
                    })}
                </List>
            </Box>
        </Container>
    )
}

export default ActiveUsers