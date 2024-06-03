import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ConversationProps } from '@/types'

const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<ConversationProps[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
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

        getConversations();
    }, []);

    return { loading, conversations };
};
export default useGetConversations;
