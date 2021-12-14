import { Alert, Button, Grid, Snackbar, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { login } from '../auth';


export default () => {
    const [register, setRegister] = React.useState(false);
    const [fullName, setFullName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [snackbar, setSnackbar] = React.useState('');
    const [error, setError] = React.useState('');

    const exitRegister = ({ snackbar }: { snackbar: boolean }) => {
        if (snackbar) {
            setSnackbar('User Registered Successfully!')
        }
        setRegister(false)
        setFullName('')
    }

    const registerUser = () => {
        fetch('http://localhost:5000/api/users', {
            method: 'post',
            body: JSON.stringify({ name: fullName.trim(), username: username.trim(), password: password.trim() })
        }
        ).then(r => r.json())
            .then(result => {
                if (result.username) {
                    exitRegister({ snackbar: true })
                }
                else if (result.error) {
                    setError(result.message)
                }
            })
    }

    const loginUser = () => {
        fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ username: username.trim(), password: password.trim() })
        }).then(r => r.json())
            .then(result => {
                if (result.access_token) {
                    login(result)
                }
                else if (result.error) {
                    setError(result.message)
                }
            })
    }

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
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                        error={Boolean(error)}
                    />}
                    <TextField
                        label="Username"
                        variant="filled"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                        error={Boolean(error)}
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type={'password'}
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        error={Boolean(error)}
                        helperText={error ? error : ''}
                    />
                    {!register && <Button
                        variant='contained'
                        onClick={() => {
                            setError('')
                            loginUser()
                        }}
                    >
                        Login
                    </Button>}
                    <Button
                        variant={register ? 'contained' : undefined}
                        onClick={() => {
                            setError('')
                            register ? registerUser() : setRegister(true)
                        }}
                    >
                        Register
                    </Button>
                    {register && <Button
                        onClick={() => {
                            setError('')
                            exitRegister({ snackbar: false })
                        }}
                    >
                        Back to Login
                    </Button>}
                    <Snackbar open={Boolean(snackbar)} autoHideDuration={6000} onClose={() => { setSnackbar('') }}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            {snackbar}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Grid>
        </Grid >
    )
}