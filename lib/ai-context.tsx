"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AIContextType {
    contextData: any;
    setContextData: (data: any) => void;
    pageName: string;
    setPageName: (name: string) => void;
    userRole: "admin" | "vendor" | "guest";
    setUserRole: (role: "admin" | "vendor" | "guest") => void;
    sync: (data: { pageName?: string; userRole?: "admin" | "vendor" | "guest"; contextData?: any }) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
    const [contextData, setContextData] = React.useState<any>({});
    const [pageName, setPageName] = React.useState<string>("");
    const [userRole, setUserRole] = React.useState<"admin" | "vendor" | "guest">("guest");

    const sync = React.useCallback((data: { pageName?: string; userRole?: "admin" | "vendor" | "guest"; contextData?: any }) => {
        if (data.pageName !== undefined) setPageName(data.pageName);
        if (data.userRole !== undefined) setUserRole(data.userRole);
        if (data.contextData !== undefined) setContextData(data.contextData);
    }, []);

    const value = React.useMemo(() => ({
        contextData,
        setContextData,
        pageName,
        setPageName,
        userRole,
        setUserRole,
        sync
    }), [contextData, pageName, userRole, sync]);

    return (
        <AIContext.Provider value={value}>
            {children}
        </AIContext.Provider>
    );
}

export function useAIContext() {
    const context = useContext(AIContext);
    if (context === undefined) {
        throw new Error("useAIContext must be used within an AIProvider");
    }
    return context;
}
