import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import useSignUp from '@/hooks/use-signup';
import { useAuthContext } from '@/context/auth-context';

import { Button } from '@/components/ui/button';
import { Main, Wrapper, Box } from '@/components/ui/container';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AiOutlineEyeInvisible, AiOutlineEye } from '@/icons';

interface formProps {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female';
}

const SignUp = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    if (!authUser) {
        navigate('/login');
    }

    const [showPassword, setShowPassword] = useState(false);
    const {
        control,
        register,
        reset,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<formProps>();

    const { loading, signup } = useSignUp();

    const togglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleFormSubmit = async (data: formProps) => {
        await signup(data);
        reset();
    };

    return (
        <Main className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <Box className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up{' '}
                    <Wrapper className="text-blue-500"> ChatApp</Wrapper>
                </h1>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Box>
                        <label className="label p-2" htmlFor="fullName">
                            <Wrapper className="text-base label-text">
                                Full Name
                            </Wrapper>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="John Doe"
                            className="w-full input input-bordered h-10"
                            {...register('fullName', {
                                required: {
                                    value: true,
                                    message: 'Full Name is required',
                                },
                            })}
                        />
                        {errors.fullName && (
                            <Wrapper className="text-xs text-red-500 font-semibold">
                                {errors.fullName.message}
                            </Wrapper>
                        )}
                    </Box>

                    <Box>
                        <label className="label p-2" htmlFor="username">
                            <Wrapper className="text-base label-text">
                                Username
                            </Wrapper>
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="john-doe"
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
                                className="w-full input input-bordered h-10"
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
                        </Wrapper>
                        {errors.password && (
                            <Wrapper className="text-xs text-red-500 font-semibold">
                                {errors.password.message}
                            </Wrapper>
                        )}
                    </Box>

                    <Box>
                        <label className="label" htmlFor="confirmPassword">
                            <Wrapper className="text-base label-text">
                                Confirm Password
                            </Wrapper>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full input input-bordered h-10"
                            {...register('confirmPassword', {
                                required: {
                                    value: true,
                                    message: 'Confirm Password is required',
                                },
                                validate: (value) =>
                                    value === getValues('password') ||
                                    'Passwords do not match',
                            })}
                        />
                        {errors.confirmPassword && (
                            <Wrapper className="text-xs text-red-500 font-semibold">
                                {errors.confirmPassword.message}
                            </Wrapper>
                        )}
                    </Box>

                    <Box>
                        <label className="label" htmlFor="confirmPassword">
                            <Wrapper className="text-base label-text">
                                Gender
                            </Wrapper>
                        </label>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue="male"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Gender is required',
                                },
                            }}
                            render={({ field }) => (
                                <Tabs {...field} className="border-white">
                                    <TabsList className="bg-rich-black-800">
                                        <TabsTrigger
                                            value={
                                                'male' as formProps['gender']
                                            }
                                            onClick={() =>
                                                setValue('gender', 'male')
                                            }
                                        >
                                            Male
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value={
                                                'female' as formProps['gender']
                                            }
                                            onClick={() =>
                                                setValue('gender', 'female')
                                            }
                                        >
                                            Female
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            )}
                        />
                    </Box>

                    <Link
                        to={'/login'}
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block select-none"
                    >
                        Already have an account?
                    </Link>

                    <Box>
                        <Button
                            className="btn btn-block btn-sm mt-2 border border-slate-700"
                            disabled={loading}
                        >
                            {loading ? (
                                <Wrapper className="loading loading-spinner"></Wrapper>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Main>
    );
};
export default SignUp;
