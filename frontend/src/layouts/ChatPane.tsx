import * as React from 'react';
import { Stack } from '@mui/material';
import ChatMessage from '../components/ChatMessage';

export default () => {
    return (
        <Stack>
            {[1, 2, 3].map((num) => (<ChatMessage key={`chat-${num}`} message={`Item ${num}`} sender="me" sentTime={new Date()} />))}
        </Stack>
    )
}