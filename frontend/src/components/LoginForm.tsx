import { Button, Grid, Stack, TextField } from '@mui/material';
import * as React from 'react';


export default () => {
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
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type={'password'}
                    />
                    {!register && <Button variant='contained'>Login</Button>}
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