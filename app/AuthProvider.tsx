"use client"
import {PropsWithChildren, useEffect} from 'react';
import {useGetUsersQuery} from "@/redux/services/user/user";
import {useAppDispatch} from "@/redux/hooks";
import {setUser} from "@/redux/slices/counterSlice";

const AuthProvider = ({children}: PropsWithChildren) => {
    const {data: user} = useGetUsersQuery();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }
    }, [user, dispatch]);
    return children;
};

export default AuthProvider;