import { useRouter } from 'next/router';
import React, { createContext, useContext, useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage';

interface IAuthContext {
    user: { name: string },
    login: (data: any) => void,
    logout: () => void,
}
const state = {
    user: { name: '' },
    login: () => { },
    logout: () => { }
}
const AuthContext = createContext<IAuthContext>(state);
export const AuthProvider = (props: { children: any }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const router = useRouter();

    const login = async (data: any) => {
        router.push("");
    }
    const logout = () => {
        setUser({});
    }
    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user])
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext);
}