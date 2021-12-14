export interface User {
    id: number;
    name: string;
    username: string;
    access_token?: string;
}

export interface Message {
    id: number;
    message: string;
    sender: string;
    sentTime: Date;
}