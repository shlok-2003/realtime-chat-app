import { useEffect, useState } from 'react';
import useConversation from '@/zustand/use-conversation';
import { toast } from 'sonner';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/messages/${selectedConversation._id}`,
                );
                const data = await res.json();

                if (data.error) throw new Error(data.error);
                setMessages(data);
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

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};
export default useGetMessages;
