import React, { lazy } from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromChildren,
} from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { Loading } from '@/components/ui/suspense-loader';

import MainLayout from './layouts/main';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));
const SignUp = lazy(() => import('@/pages/signup'));
const NotFound = lazy(() => import('@/pages/not-found'));

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route>
            <Route path="/" element={<MainLayout />}>
                <Route
                    path="/"
                    element={
                        <Loading>
                            <Home />
                        </Loading>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Loading>
                            <Login />
                        </Loading>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Loading>
                            <SignUp />
                        </Loading>
                    }
                />
            </Route>

            <Route
                path="*"
                element={
                    <Loading>
                        <NotFound />
                    </Loading>
                }
            />
        </Route>,
    ),
);

export default function App() {
    return (
        <React.Fragment>
            <RouterProvider router={router} />
            <Toaster />
        </React.Fragment>
    );
}
