import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Paper, Stack } from '@mui/material';
import { User } from '../models';

export default () => {
    const users: User[] = [
        {
            id: 1,
            name: 'Mike Whitaker',
            username: 'mike'
        },
        {
            id: 2,
            name: 'Sabreesh Chinta',
            username: 'sabreesh'
        },
        {
            id: 3,
            name: 'Simon Kalouche',
            username: 'simon'
        }
    ]
    return (
        <Stack spacing={0} style={{ height: '90vh', overflow: 'auto', padding: '10px' }}>
            <List>
                {users.map((user) => (<ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={user.name} secondary={user.username} />
                    </ListItemButton>
                </ListItem>))}
            </List>
        </Stack>
    )
}