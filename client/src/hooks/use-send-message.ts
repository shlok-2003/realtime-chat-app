import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

import { APISuccess, APIError, MessageProps, ConversationProps } from '@/types';
import useConversation from '@/zustand/use-conversation';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: MessageProps) => {
        setLoading(true);
        try {
            const res: APISuccess<{
                message: MessageProps;
                conversation: ConversationProps;
            }> &
                APIError = await axios
                .post(
                    `/api/messages/send/${selectedConversation._id}`,
                    message,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((res) => res.data);

            if (!res.success) {
                throw new Error(res.message);
            }

            setMessages([...messages, res.data.message.message]);
        } catch (error) {
            error instanceof Error &&
                toast.error(error.message, {
                    position: 'top-right',
                    duration: 3000,
                });
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;
