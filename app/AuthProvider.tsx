"use client"
import {PropsWithChildren, useEffect} from 'react';
import {useGetUsersQuery} from "@/redux/services/user/user";
import {useAppDispatch} from "@/redux/hooks";
import {setUser} from "@/redux/slices/counterSlice";
import Loading from "@/app/loading";

const AuthProvider = ({children}: PropsWithChildren) => {
    const {data: user,isLoading} = useGetUsersQuery();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }
    }, [user, dispatch]);
    return isLoading?<Loading/>: children;
};

export default AuthProvider;