import { Alert, Button, Grid, Snackbar, Stack, TextField } from '@mui/material';
import * as React from 'react';


export default () => {
    const [register, setRegister] = React.useState(false);
    const [fullName, setFullName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [error, setError] = React.useState('');

    const exitRegister = ({ snackbar }: { snackbar: boolean }) => {
        if (snackbar) {
            setShowSnackbar(true)
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
                    <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={() => { setShowSnackbar(false) }}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            User Registered Successfully!
                        </Alert>
                    </Snackbar>
                </Stack>
            </Grid>
        </Grid >
    )
}