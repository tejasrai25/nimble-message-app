import * as React from 'react';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack } from '@mui/material';
import { User } from '../models';
import { authFetch } from '../auth';

const ContactList = ({ selectedContact, setSelectedContact }:
    { selectedContact: string, setSelectedContact: React.Dispatch<React.SetStateAction<string>> }) => {

    const [contacts, setContacts] = React.useState<User[]>([]);

    React.useEffect(() => {
        authFetch('http://localhost:5000/api/users')
            .then(r => r.json())
            .then(users => setContacts(users))
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Stack spacing={0} style={{ maxHeight: '90vh', margin: '0em', overflow: 'auto' }}>
                    <List>
                        {contacts.map((contact) => (
                            <ListItem key={`contact-${contact.username}`} disablePadding>
                                <ListItemButton selected={contact.username === selectedContact} onClick={() => { setSelectedContact(contact.username) }}>
                                    <ListItemAvatar>
                                        <Avatar>{contact.name ? contact.name[0] : 'U'}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={contact.name} secondary={contact.username} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default ContactList
