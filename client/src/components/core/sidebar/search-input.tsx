import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import useConversation from '@/zustand/use-conversation';
import useGetConversations from '@/hooks/use-get-conversations';

import { IoSearchSharp } from '@/icons';
import { Button } from '@/components/ui/button';

interface formProps {
    search: string;
}

export default function SearchInput() {
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const { register, reset, handleSubmit } = useForm<formProps>();

    const handleFormSubmit = (data: formProps) => {
        const conversation = conversations.find((c) =>
            c.fullName.toLowerCase().includes(data.search.toLowerCase()),
        );

        if (conversation) {
            setSelectedConversation(conversation);
            reset();
        } else {
            toast.error('No such user found!', {
                position: 'bottom-right',
                duration: 2000,
            });
        }
    };
    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex items-center gap-2"
        >
            <input
                type="text"
                placeholder="Search…"
                className="input input-bordered rounded-full"
                {...register('search', {
                    required: {
                        value: true,
                        message: 'Search field is required',
                    },
                    minLength: {
                        value: 3,
                        message:
                            'Search term must be at least 3 characters long',
                    },
                })}
            />
            <Button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white"
            >
                <IoSearchSharp className="w-6 h-6 outline-none select-none" />
            </Button>
        </form>
    );
}
