import { useRef, useEffect } from 'react';

import { Message } from '.';
import { Box } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import MessageSkeleton from '@/components/ui/skeleton';

import useGetMessages from '@/hooks/use-get-messages';
import useListenMessages from '@/hooks/use-listen-messages';

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }, [messages]);

    return (
        <Box className="px-4 flex-1 overflow-auto">
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <Box key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </Box>
                ))}

            {loading &&
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <Typography
                    variant="p"
                    affects="removePMargin"
                    className="text-center"
                >
                    Send a message to start the conversation
                </Typography>
            )}
        </Box>
    );
};
export default Messages;
