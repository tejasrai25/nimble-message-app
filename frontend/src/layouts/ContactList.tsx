import * as React from 'react';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack } from '@mui/material';
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
        },
    ]
    const [selected, setSelected] = React.useState('');
    return (
        <Grid container>
            <Grid item xs={12}>
                <Stack spacing={0} style={{ maxHeight: '90vh', margin: '0em', overflow: 'auto' }}>
                    <List>
                        {users.map((user) => (
                            <ListItem key={`contact-${user.username}`} disablePadding>
                                <ListItemButton selected={user.username === selected} onClick={() => { setSelected(user.username) }}>
                                    <ListItemAvatar>
                                        <Avatar>{user.name ? user.name[0] : 'U'}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} secondary={user.username} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </Grid>
        </Grid>
    )
}