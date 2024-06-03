import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <main className="relative p-4 h-screen flex items-center justify-center">
            <main className="[&>*]:font-sans">
                <Outlet />
                {children}
            </main>
        </main>
    );
};

export default MainLayout;
