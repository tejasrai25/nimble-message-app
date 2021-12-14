import { createAuthProvider } from 'react-token-auth';
import { User } from '../models';

export const { useAuth, authFetch, login, logout, getSessionState } =
    createAuthProvider<User>({
        storageKey: 'access_token'
    });