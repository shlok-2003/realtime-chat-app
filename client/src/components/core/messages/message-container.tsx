import { useEffect } from 'react';

import { Box, Wrapper } from '@/components/ui/container';
import { MessageInput, Messages } from '.';
import { TiMessages } from '@/icons';

import useConversation from '@/zustand/use-conversation';
import { useAuthContext } from '@/context/auth-context';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <Box className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <Box className="bg-slate-500 px-4 py-2 mb-2">
                        <Wrapper className="label-text">To:</Wrapper>{' '}
                        <Wrapper className="text-gray-900 font-bold">
                            {selectedConversation.fullName}
                        </Wrapper>
                    </Box>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </Box>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <Box className="flex items-center justify-center w-full h-full">
            <Box className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {authUser?.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </Box>
        </Box>
    );
};
