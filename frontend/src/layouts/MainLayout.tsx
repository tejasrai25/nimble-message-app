import * as React from 'react';
import { Grid } from '@mui/material';
import ContactList from './ContactList';
import ChatPane from './ChatPane';
import TopBar from './TopBar';
import { User } from '../models';
import LoginForm from '../components/LoginForm';
import { useAuth, getSessionState } from '../auth';

export default () => {
    const [loggedIn] = useAuth();
    const currentUser = getSessionState();

    const [selectedContact, setSelectedContact] = React.useState('');
    return (
        <>
            <TopBar user={currentUser} />
            {loggedIn &&
                <Grid container spacing={0}>
                    <Grid item xs={4}>
                        <ContactList selected={selectedContact} setSelected={setSelectedContact} />
                    </Grid>
                    <Grid item xs={8}>
                        <ChatPane />
                    </Grid>
                </Grid>
            }
            {!loggedIn &&
                <LoginForm />
            }
        </>
    );
}