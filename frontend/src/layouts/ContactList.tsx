import * as React from 'react';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack } from '@mui/material';
import { User } from '../models';
import { authFetch } from '../auth';

// Component for the the left pane that shows available contacts
const ContactList = (
    { selectedContact, setSelectedContact }:
        {
            selectedContact: string,
            setSelectedContact: React.Dispatch<React.SetStateAction<string>>
        }): JSX.Element => {

    // state to store list of contacts
    const [contacts, setContacts] = React.useState<User[]>([]);

    // on mount hook to get contacts
    React.useEffect(() => {
        authFetch('http://localhost:5000/api/users')
            .then(r => r.json())
            .then(users => setContacts(users));
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Stack spacing={0} style={{ maxHeight: '90vh', margin: '0em', overflow: 'auto' }}>
                    <List>
                        {contacts.map((contact) => (
                            <ListItem key={`contact-${contact.username}`} disablePadding>
                                <ListItemButton selected={contact.username === selectedContact} onClick={() => { setSelectedContact(contact.username); }}>
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
    );
};

export default ContactList;
