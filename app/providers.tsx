'use client';

import {Provider} from 'react-redux';
import {store} from '@/redux/store';
import React from "react";
import AuthProvider from "@/app/AuthProvider";

export function Providers({children}: Readonly<{ children: React.ReactNode }>) {
    return <Provider store={store}>
        <AuthProvider>
        {children}
        </AuthProvider>
    </Provider>;
}
