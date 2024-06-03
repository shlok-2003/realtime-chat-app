import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

import { APISuccess, APIError } from '@/types';
import { useAuthContext } from '../context/auth-context';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);

        try {
            const res: APISuccess<object> & APIError = await axios
                .post(
                    '/api/auth/logout',
                    {},
                    {
                        headers: { 'Content-Type': 'application/json' },
                    },
                )
                .then((res) => res.data);

            if (!res.success) {
                throw new Error(res.message);
            }

            localStorage.removeItem('chat-user');
            setAuthUser(undefined);
        } catch (error) {
            error instanceof Error && toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};
export default useLogout;
