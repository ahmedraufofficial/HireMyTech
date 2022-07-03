import React from 'react'
import { ListItem, Typography } from '@mui/material';

const User = (props) => {
    return (
        <ListItem sx={{}}>
            <Typography variant='p'>{props.user.username}</Typography> 
        </ListItem>
    )
}

export default User