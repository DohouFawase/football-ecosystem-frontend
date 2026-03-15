'use client'
import { store } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';

const ReduceProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Provider store={store}>
                {children}
            </Provider>
        </div>
    );
}

export default ReduceProvider;
