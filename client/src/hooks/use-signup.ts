import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import { useAuthContext } from '@/context/auth-context';
import { BACKEND_URL } from '@/utils/constants';

import { APISuccess, APIError, UserProps } from '@/types';

const useSignUp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

    type SignUpProps = {
        fullName: string;
        username: string;
        password: string;
        confirmPassword: string;
        gender: 'male' | 'female';
    };

    const signup = async (data: SignUpProps) => {
        setLoading(true);

        try {
            const res: APISuccess<{ user: UserProps }> & APIError = await axios
                .post(`${BACKEND_URL}/auth/signup`, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then((res) => res.data);

            if (!res.success) {
                throw new Error(res.message);
            }

            localStorage.setItem('chat-user', JSON.stringify(res.data.user));
            setAuthUser(res.data.user);
            toast.success('Account created successfully', {
                position: 'top-right',
                duration: 3000,
            });

            setTimeout(() => {
                window.location.href = '/home';
            }, 3000);
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

    return { loading, signup };
};

export default useSignUp;
