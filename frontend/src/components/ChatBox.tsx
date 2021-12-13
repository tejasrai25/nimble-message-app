import * as React from 'react';
import { Button, Divider, Stack, TextField } from '@mui/material';


export default () => {

    const [value, setValue] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <Stack direction="row" spacing={2} style={{ width: '100%', padding: '5px' }}>
            <TextField
                multiline
                maxRows={4}
                value={value}
                onChange={handleChange}
                style={{ width: '90%' }}
            />
            <Divider orientation="vertical" flexItem />
            <Button variant='contained'>Send</Button>
        </Stack>
    )
}