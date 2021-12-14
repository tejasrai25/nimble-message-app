import { createAuthProvider } from 'react-token-auth';
import { AuthenticatedUser } from '../models';

export const { useAuth, authFetch, login, logout, getSessionState } =
    createAuthProvider<AuthenticatedUser>({
        getAccessToken: (session) => (session['access_token']),
    });