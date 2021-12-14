import { Button, Grid, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { loginUser } from '../zmq';


export default () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [register, setRegister] = React.useState(false);
    const registerUser = () => { setRegister(false) }
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '80vh' }}
        >
            <Grid item xs={3}>
                <Stack
                    component="form"
                    sx={{
                        width: '25ch',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    {register && <TextField
                        label="Name"
                        variant="filled"
                    />}
                    <TextField
                        label="Username"
                        variant="filled"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type={'password'}
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                    {!register && <Button
                        variant='contained'
                        onClick={() => { loginUser({ username, password }) }}
                    >
                        Login
                    </Button>}
                    <Button
                        variant={register ? 'contained' : undefined}
                        onClick={() => { register ? registerUser() : setRegister(true) }}
                    >
                        Register
                    </Button>
                </Stack>
            </Grid>
        </Grid >
    )
}