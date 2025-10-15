"use client";

import React, {createContext, useContext, useEffect, useState} from "react";
import {createClient} from "@/lib/supabase/client";
import type {User} from "@supabase/supabase-js";
import {_getProfile} from "@/utils/api/__profile";
import {_tb_profile} from "@/utils/api/supabase_tb/_tb_profile";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    profile: _tb_profile | null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: Readonly<{ children: React.ReactNode }>) {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<_tb_profile | null>(null)
    const [loading, setLoading] = useState(true);

    // 🔹 Load initial user
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const {data} = await supabase.auth.getUser();
            if (data.user) {
                const {data: profileData} = await _getProfile(data.user.id);
                setProfile(profileData);
                setUser(data?.user ?? null);
                setLoading(false);
            }

        };

        getUser().then(r => r);

        // 🔹 Listen for login/logout
        const {data: subscription} = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            subscription?.subscription.unsubscribe();
        };
    }, [supabase]);

    const refreshUser = async () => {
        const {data} = await supabase.auth.getUser();
        setUser(data?.user ?? null);
    };

    return (
        <AuthContext.Provider value={{user, loading, refreshUser, profile}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
