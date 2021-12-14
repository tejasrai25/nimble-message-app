import * as React from 'react';
import { Grid } from '@mui/material';
import { getSessionState, useAuth } from '../auth';
import LoginForm from '../components/LoginForm';
import ChatPane from './ChatPane';
import ContactList from './ContactList';
import TopBar from './TopBar';

// The main layout component
const MainLayout = (): JSX.Element => {
    // get login status from auth hook
    const [loggedIn] = useAuth();
    // get currentUser details from auth store
    const currentUser = getSessionState();

    // state to manage active chat
    const [selectedContact, setSelectedContact] = React.useState('');

    return (
        <>
            <TopBar user={currentUser} />
            {loggedIn &&
                <Grid container spacing={0}>
                    <Grid item xs={4}>
                        <ContactList selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
                    </Grid>
                    <Grid item xs={8}>
                        <ChatPane selectedContact={selectedContact} />
                    </Grid>
                </Grid>
            }
            {!loggedIn &&
                <LoginForm />
            }
        </>
    );
};

export default MainLayout;