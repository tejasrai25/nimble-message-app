import * as React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Chat = (sentMessage: boolean) => (styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    backgroundColor: sentMessage ? theme.palette.primary.light : theme.palette.grey[200],
})));

const PaddedText = styled(Typography)(() => ({
    padding: '5px'
}));

const ChatMessage = ({ message, sender, sentTime }: { message: string, sender: string, sentTime: Date }) => {
    const ColoredChat = Chat(sender === 'me')
    return (
        <Grid container justifyContent={sender === 'me' ? 'flex-end' : 'flex-start'}>
            <Grid item xs={5} >
                <ColoredChat elevation={3}>
                    <Grid container justifyContent={'flex-start'}>
                        <Grid item xs={6} >
                            <PaddedText variant='caption' >{sender}</PaddedText>
                        </Grid>
                        <Grid item xs={12}>
                            <PaddedText variant='body2'>{message}</PaddedText>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'flex-end'}>
                        <Grid item xs={6} >
                            <Grid container justifyContent={'flex-end'}>
                                <PaddedText variant='caption' align='right'>{`${sentTime.toLocaleDateString()} ${sentTime.toLocaleTimeString()}`}</PaddedText>
                            </Grid>
                        </Grid>
                    </Grid>
                </ColoredChat >
            </Grid >
        </Grid >
    )
}

export default ChatMessage
