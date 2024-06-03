import useGetConversations from '@/hooks/use-get-conversations';
import { getRandomEmoji } from '@/utils/emojis';
import { Conversation } from '.';


const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    return (
        <div className="py-2 flex flex-col overflow-auto">
            {conversations.map((conversation, idx: number) => (
                <Conversation
                    key={conversation._id}
                    emoji={getRandomEmoji()}
                    conversation={conversation}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}

            {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
            ) : null}
        </div>
    );
};
export default Conversations;
