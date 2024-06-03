import { createContext, useContext, useState } from 'react';

import { AuthUser } from '@/types';

interface IAuthContext {
    authUser: undefined | AuthUser;
    setAuthUser: React.Dispatch<React.SetStateAction<undefined | AuthUser>>;
}

export const AuthContext = createContext<IAuthContext>({
    authUser: undefined,
    setAuthUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthContextProvider: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const storedUser = localStorage.getItem('chat-user') ?? null;

    const [authUser, setAuthUser] = useState<AuthUser | undefined>(
        storedUser ? JSON.parse(storedUser) : undefined,
    );

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContextProvider };
