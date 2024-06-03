import { useEffect } from 'react';

import { useSocketContext } from '@/context/socket-context';
import useConversation from '@/zustand/use-conversation';

import notificationSound from '../assets/notification.mp3';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => {
            if (socket) {
                socket.off('newMessage');
            }
        };
    }, [socket, setMessages, messages]);
};
export default useListenMessages;
