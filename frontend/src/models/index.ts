// model for the user object in /api/users response
export interface User {
    id: number;
    name: string;
    username: string;
}

// model for the user object in /login response
export interface AuthenticatedUser extends User {
    access_token: string;
}


// model for the message object in /api/messages raw response
export interface ResponseMessage {
    id: number;
    message: string;
    sender: string;
    sentTime: string;
}

// model for the message object in /api/messages processed response
export interface Message {
    id: number;
    message: string;
    sender: string;
    sentTime: Date;
}