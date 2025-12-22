"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Settings,
    ShoppingCart,
    Package,
    BarChart3
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

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/vendor",
        icon: LayoutDashboard,
    },
    {
        title: "Orders",
        url: "/vendor/orders",
        icon: ShoppingCart,
    },
    {
        title: "Products",
        url: "/vendor/products",
        icon: Package,
    },
    {
        title: "Analytics",
        url: "/vendor/analytics",
        icon: BarChart3,
    },
    {
        title: "Settings",
        url: "/vendor/settings",
        icon: Settings,
    },
]

import { VendorAccount } from "@/components/vendor-account"
import { VENDOR_PROFILE } from "@/data/vendor/profile"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    // We need to access sidebar state to properly label the toggle button
    const { open, isMobile, setOpenMobile } = useSidebar()

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
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
                <VendorAccount profile={VENDOR_PROFILE} />
                <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2">
                    <ThemeToggle />
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {/* We wrap SidebarTrigger to add tooltip and styling */}
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
