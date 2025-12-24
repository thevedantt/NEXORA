"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useAIContext } from "@/lib/ai-context"
import { useEffect } from "react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Ensure context is set even if individual pages miss it
    const { setUserRole } = useAIContext();

    useEffect(() => {
        setUserRole("admin");
    }, []);

    return (
        <SidebarProvider defaultOpen={true}>
            <AdminSidebar />
            <SidebarInset className="bg-background transition-colors duration-500">
                <header className="flex h-14 items-center gap-4 border-b px-6 lg:hidden">
                    <SidebarTrigger />
                    <span className="font-semibold">Nexora Admin</span>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6 transition-all duration-500 ease-in-out">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
