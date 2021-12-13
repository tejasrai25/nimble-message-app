import * as React from 'react';
import { Grid, Stack } from '@mui/material';
import ChatMessage from '../components/ChatMessage';
import ChatBox from '../components/ChatBox';

export default () => {
    const messages: {
        id: number;
        message: string;
        sender: string;
        sentTime: Date;
    }[] = [
            {
                id: 1,
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                sender: 'Sabreesh',
                sentTime: new Date(),
            },
            {
                id: 2,
                message: 'Lorem ipsum',
                sender: 'me',
                sentTime: new Date(),
            },
            {
                id: 3,
                message: 'Lorem ipsum sit',
                sender: 'Sabreesh',
                sentTime: new Date(),
            },
            {
                id: 4,
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                sender: 'me',
                sentTime: new Date(),
            }, {
                id: 5,
                message: 'Lorem ipsum sit',
                sender: 'Sabreesh',
                sentTime: new Date(),
            },
            {
                id: 6,
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                sender: 'me',
                sentTime: new Date(),
            },
        ]

    const scrollRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView()
        }
    }, [messages]);
    return (
        <Grid container>
            <Stack spacing={2} style={{ height: '90vh', overflow: 'auto', padding: '10px' }}>
                {messages.map((message) => {
                    const { id, ...messageProps } = message
                    return <ChatMessage key={`chat-${message.id}`} {...messageProps} />
                })}
                <div ref={scrollRef} style={{ height: 0 }}></div>
            </Stack>
            <ChatBox />
        </Grid >
    )
}