import * as React from 'react';
import { Grid, Stack } from '@mui/material';
import ChatMessage from '../components/ChatMessage';
import ChatBox from '../components/ChatBox';
import { Message, ResponseMessage } from '../models';
import { authFetch, getSessionState } from '../auth';

const ChatPane = ({ selectedContact }: { selectedContact: string }) => {
    const [messages, setMessages] = React.useState<Message[]>([]);

    React.useEffect(() => {
        let interval: NodeJS.Timer
        if (selectedContact) {
            interval = setInterval(() => {
                authFetch(`http://localhost:5000/api/messages?user=${selectedContact}`)
                    .then(r => r.json())
                    .then(chats => {
                        console.log(chats)
                        setMessages(chats.map((chat: ResponseMessage) => ({ ...chat, sentTime: new Date(chat.sentTime) })))
                    })

            }, 100);
        }
        return () => {
            if (selectedContact) {
                clearInterval(interval);
            }
        }
    }, [selectedContact]);

    const scrollRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView()
        }
    }, [messages.length]);
    return (
        <Grid container>
            <Stack spacing={2} sx={{ height: '80vh', width: '100%', overflow: 'auto', padding: '10px', backgroundColor: 'grey.100' }}>
                {messages.map((message) => {
                    const { id, sender, ...messageProps } = message
                    const chatSender = sender === getSessionState()?.username ? 'me' : sender
                    return <ChatMessage key={`chat-${message.id}`} sender={chatSender} {...messageProps} />
                })}
                <div ref={scrollRef} style={{ height: 0 }}></div>
            </Stack>
            <ChatBox />
        </Grid >
    )
}

export default ChatPane