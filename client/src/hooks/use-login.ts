import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthContext } from '@/context/auth-context';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        setLoading(true);

        try {
            const res = await axios
                .post(
                    '/api/auth/login',
                    { username, password },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    },
                )
                .then((res) => res.data);

            if (res.error) {
                throw new Error(res.error);
            }

            localStorage.setItem('chat-user', JSON.stringify(res));
            setAuthUser(res);
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

    return { loading, login };
};
export default useLogin;
