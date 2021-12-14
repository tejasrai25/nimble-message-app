import * as React from 'react';
import { Button, Divider, Stack, TextField } from '@mui/material';
import { authFetch } from '../auth';


const ChatBox = ({ selectedContact }: { selectedContact: string }) => {

    const [value, setValue] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const sendMessage = () => {
        authFetch('http://localhost:5000/api/messages', {
            method: 'post',
            body: JSON.stringify({ message: value, receiver: selectedContact })
        })
            .then(r => r.json())
            .then(result => {
                if (result.id) {
                    setValue('')
                }
            })
    }

    return (
        <Stack direction="row" spacing={2} style={{ width: '100%', padding: '5px' }}>
            <TextField
                multiline
                maxRows={4}
                value={value}
                onChange={handleChange}
                style={{ width: '90%' }}
                disabled={!Boolean(selectedContact)}
            />
            <Divider orientation="vertical" flexItem />
            <Button
                variant='contained'
                disabled={!Boolean(selectedContact) || value === ''}
                onClick={() => sendMessage()}
            >
                Send
            </Button>
        </Stack >
    )
}

export default ChatBox
