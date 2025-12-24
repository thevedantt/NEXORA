"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { useUser } from "@clerk/nextjs";

interface UserDB {
    id: string;
    clerkUserId: string;
    name: string;
    email: string;
    role: "ADMIN" | "VENDOR";
    vendorId?: string | null;
}

interface UserContextType {
    userDB: UserDB | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserSidebarProvider({ children }: { children: ReactNode }) {
    const { isLoaded, isSignedIn } = useUser();
    const [userDB, setUserDB] = useState<UserDB | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const syncUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/user/sync");
            if (res.ok) {
                const data = await res.json();
                setUserDB(data);
            }
        } catch (error) {
            console.error("Failed to sync user:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            syncUser();
        } else if (isLoaded && !isSignedIn) {
            setUserDB(null);
            setIsLoading(false);
        }
    }, [isLoaded, isSignedIn, syncUser]);

    const value = useMemo(() => ({
        userDB,
        isLoading,
        refreshUser: syncUser
    }), [userDB, isLoading, syncUser]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserDB = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserDB must be used within a UserSidebarProvider");
    }
    return context;
};
