import * as React from 'react';
import { Grid } from '@mui/material';
import ContactList from './ContactList';
import ChatPane from './ChatPane';
import TopBar from './TopBar';
import { User } from '../models';
import LoginForm from '../components/LoginForm';

export default () => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    return (
        <>
            <TopBar user={currentUser} />
            {currentUser &&
                <Grid container spacing={0}>
                    <Grid item xs={4}>
                        <ContactList />
                    </Grid>
                    <Grid item xs={8}>
                        <ChatPane />
                    </Grid>
                </Grid>
            }
            {!currentUser &&
                <LoginForm />
            }
        </>
    );
}