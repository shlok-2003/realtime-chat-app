export interface ConversationProps {
    _id: string;
    participants: string[];
    messages: string[];
}

export interface MessageProps {
    senderId: string;
    receiverId: string;
    message: string;
}

export interface AuthUser {
    _id?: string;
    fullName: string;
    username: string;
    password: string;
    gender: 'male' | 'female';
    profilePic: string;
}

export interface APISuccess<T> {
    success: false;
    data: T;
}

export interface APIError {
    success: false;
    message: string;
}

export interface UserProps {
    _id?: string;
    fullName: string;
    username: string;
    password: string;
    gender: 'male' | 'female';
    profilePic: string;
}
