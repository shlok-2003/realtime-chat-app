import { useForm } from 'react-hook-form';

import { BsSend } from '@/icons';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/ui/container';
import useSendMessage from '@/hooks/use-send-message';

interface formProps {
    message: string;
}

const MessageInput = () => {
    const { loading, sendMessage } = useSendMessage();

    const { reset, register, handleSubmit } = useForm<formProps>();

    const handleFormSubmit = async (data: formProps) => {
        await sendMessage(data.message);

        reset();
    };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit(handleFormSubmit)}>
            <Box className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
                    placeholder="Send a message"
                    {...register('message', { required: true })}
                />
                <Button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                >
                    {loading ? (
                        <Box className="loading loading-spinner" />
                    ) : (
                        <BsSend />
                    )}
                </Button>
            </Box>
        </form>
    );
};
export default MessageInput;
