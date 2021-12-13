import * as React from 'react';
import { Paper, Stack } from '@mui/material';

export default () => {
    return (
        <Stack>
            {[1, 2, 3].map((num) => (<Paper>Item {num}</Paper>))}
        </Stack>
    )
}