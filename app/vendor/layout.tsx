import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function VendorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset className="bg-background transition-colors duration-500">
                <header className="flex h-14 items-center gap-4 border-b px-6 lg:hidden">
                    <SidebarTrigger />
                    <span className="font-semibold">Nexora Vendor</span>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6 transition-all duration-500 ease-in-out">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
