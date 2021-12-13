import * as React from 'react';
import Grid from '@mui/material/Grid';
import ContactList from './ContactList';
import ChatPane from './ChatPane';

export default () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <ContactList />
            </Grid>
            <Grid item xs={8}>
                <ChatPane />
            </Grid>
        </Grid>
    );
}