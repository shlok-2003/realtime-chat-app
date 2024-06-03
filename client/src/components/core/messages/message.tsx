import { useAuthContext } from '@/context/auth-context';
import { extractTime } from '@/utils/extract-time';
import useConversation from '@/zustand/use-conversation';

import { Box } from '@/components/ui/container';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe
        ? authUser.profilePic
        : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';

    const shakeClass = message.shouldShake ? 'shake' : '';

    return (
        <Box className={`chat ${chatClassName}`}>
            <Box className="chat-image avatar">
                <Box className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic}
                    />
                </Box>
            </Box>
            <Box
                className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
            >
                {message.message}
            </Box>
            <Box className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {formattedTime}
            </Box>
        </Box>
    );
};
export default Message;
