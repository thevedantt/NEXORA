"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    AlertTriangle,
    Settings,
    Shield
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Vendors",
        url: "/admin/vendors",
        icon: Users,
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Alerts",
        url: "/admin/alerts",
        icon: AlertTriangle,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
]

export function AdminSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { isMobile, setOpenMobile } = useSidebar()

    return (
        <Sidebar collapsible="icon" {...props} className="border-r border-border bg-sidebar/50 backdrop-blur-sm">
            <SidebarHeader className="h-16 flex items-center justify-center border-b border-sidebar-border/50">
                <div className="flex items-center gap-2 font-bold text-xl text-primary transition-all group-data-[collapsible=icon]:hidden">
                    NEXORA
                </div>
                <div className="hidden group-data-[collapsible=icon]:flex font-bold text-xl text-primary">
                    N
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin Controls</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={pathname === item.url}
                                        className="hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground transition-colors duration-200"
                                    >
                                        <a
                                            href={item.url}
                                            onClick={() => isMobile && setOpenMobile(false)}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-2 border-t border-sidebar-border/50 gap-2">
                <div className="flex items-center gap-3 p-2 rounded-md group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        AD
                    </div>
                    <div className="flex flex-col text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold">Administrator</span>
                        <span className="text-xs text-muted-foreground">Nexora Ops</span>
                    </div>
                </div>

                <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2">
                    <ThemeToggle />
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <SidebarTrigger className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-transparent" />
                            </TooltipTrigger>
                            <TooltipContent side="right" align="center">
                                <p>Toggle sidebar</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
