import * as React from 'react';
import { Grid } from '@mui/material';
import ContactList from './ContactList';
import ChatPane from './ChatPane';
import TopBar from './TopBar';

export default () => {
    return (
        <>
            <TopBar />
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <ContactList />
                </Grid>
                <Grid item xs={8}>
                    <ChatPane />
                </Grid>
            </Grid>
        </>
    );
}