import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/context/auth-context';

import { Box, Main, Wrapper } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { AiOutlineEyeInvisible, AiOutlineEye } from '@/icons';

import useLogin from '@/hooks/use-login';

interface formProps {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    if (!authUser) {
        navigate('/login');
    }

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<formProps>();

    const { loading, login } = useLogin();

    const togglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleFormSubmit = async (data: formProps) => {
        await login(data);
        data;
        reset();
    };

    return (
        <Main className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <Box className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login
                    <Wrapper className="text-blue-500"> ChatApp</Wrapper>
                </h1>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Box>
                        <label className="label p-2" htmlFor="username">
                            <Wrapper className="text-base label-text">
                                Username
                            </Wrapper>
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            className="w-full input input-bordered h-10"
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: 'Username is required',
                                },
                            })}
                        />
                        {errors.username && (
                            <Wrapper className="text-xs text-red-500 font-semibold">
                                {errors.username.message}
                            </Wrapper>
                        )}
                    </Box>

                    <Box>
                        <label className="label" htmlFor="password">
                            <Wrapper className="text-base label-text">
                                Password
                            </Wrapper>
                        </label>
                        <Wrapper className="relative flex w-full flex-1 items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter Password"
                                className="w-full input input-bordered h-10 select-none"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    },
                                })}
                            />
                            <Wrapper
                                onClick={togglePassword}
                                className="text-rich-black-25 absolute right-0 z-[10] cursor-pointer pr-2 text-2xl"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )}
                            </Wrapper>
                            {errors.password && (
                                <Wrapper className="text-xs text-red-500 font-semibold">
                                    {errors.password.message}
                                </Wrapper>
                            )}
                        </Wrapper>
                    </Box>
                    <Link
                        to="/signup"
                        className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block select-none"
                    >
                        Don't have an account?
                    </Link>

                    <Box>
                        <Button
                            className="btn btn-block btn-sm mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <Wrapper className="loading loading-spinner "></Wrapper>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Main>
    );
};
export default Login;
