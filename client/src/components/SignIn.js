import React from 'react'
import { Button, TextField, Stack, Container } from '@mui/material';

const SignIn = (props) => {
  return (
    <Container maxWidth="sm">
        <form onSubmit={e => {
        e.preventDefault();
        props.handleConnection();
        }}>
            <Stack spacing={2}>
                <TextField variant="outlined" required={true} value={props.username} onChange={e => props.setUsername(e.target.value)} label="Username" />
                <Button variant="contained" type="submit">Submit</Button>
            </Stack>
        </form>
    </Container>
  )
}

export default SignIn