import * as React from 'react';
import { Button, Divider, Stack, TextField } from '@mui/material';


export default () => {

    const [value, setValue] = React.useState('Controlled');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <Stack direction="row" spacing={1}>
            <TextField
                multiline
                maxRows={4}
                value={value}
                onChange={handleChange}
            />
            <Divider orientation="vertical" flexItem />
            <Button variant='contained'>Send</Button>
        </Stack>
    )
}