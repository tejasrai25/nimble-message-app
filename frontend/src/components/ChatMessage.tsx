import * as React from 'react';
import { Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Chat = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.light,
    height: 60,
    lineHeight: '60px',
}));

export default ({ message, sender, sentTime }: { message: string, sender: string, sentTime: Date }) => {
    return (
        <Stack>
            <div>{sender}</div>
            <Chat elevation={3}>
                {message}
            </Chat>
            <div>{sentTime}</div>
        </Stack>
    )
}