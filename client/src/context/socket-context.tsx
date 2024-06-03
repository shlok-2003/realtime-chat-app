import { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from './auth-context';
import io, { Socket } from 'socket.io-client';

import { UserProps } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ISocketContext {
    socket: null | Socket;
    onlineUsers: UserProps[];
}

const SocketContext = createContext<ISocketContext>({
    socket: null,
    onlineUsers: [],
});

const useSocketContext = () => {
    return useContext(SocketContext);
};

const SocketContextProvider: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<null | Socket>(null);
    const [onlineUsers, setOnlineUsers] = useState<UserProps[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socketInstance: Socket = io(
                'https://chat-app-yt.onrender.com',
                {
                    query: {
                        userId: authUser._id,
                    },
                },
            );

            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socketInstance.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => {
                if (socketInstance) {
                    socketInstance.close();
                }
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser, socket]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContextProvider, useSocketContext };
