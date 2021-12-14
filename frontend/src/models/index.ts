export interface User {
    id: number;
    name: string;
    username: string;
}

export interface AuthenticatedUser extends User {
    access_token: string;
}

export interface ResponseMessage {
    id: number;
    message: string;
    sender: string;
    sentTime: string;
}

export interface Message {
    id: number;
    message: string;
    sender: string;
    sentTime: Date;
}