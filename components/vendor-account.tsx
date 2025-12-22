"use client";

import * as React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { VendorProfile } from "@/data/vendor/profile";

interface VendorAccountProps {
    profile: VendorProfile;
}

export function VendorAccount({ profile }: VendorAccountProps) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* We wrap in a div or span for the tooltip trigger behavior consistency */}
                        <div className="flex items-center gap-3 cursor-default">
                            <Avatar className="h-9 w-9 border border-sidebar-border rounded-md">
                                <AvatarImage src={profile.avatarUrl} alt={profile.vendorName} />
                                <AvatarFallback className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-medium">
                                    {profile.initials}
                                </AvatarFallback>
                            </Avatar>

                            {/* Text content - Hidden when collapsed */}
                            <div className="flex flex-col text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="font-semibold truncate">{profile.vendorName}</span>
                                <span className="text-xs text-muted-foreground truncate">{profile.role}</span>
                            </div>
                        </div>
                    </TooltipTrigger>

                    {/* Tooltip Content - Only shown when collapsed (via CSS or logic, Shadcn sidebar usually handles this or we rely on tooltip only appearing on hover) */}
                    {/* Since this is inside the sidebar which might be collapsed, we want the tooltip to provide context. 
                        Ideally, we show it only if collapsed, but showing it on hover in expanded state isn't terrible. 
                        However, the req says "Tooltip for collapsed state". 
                        We can use the `group-data-[collapsible=icon]` on the TooltipContent or wrapper. 
                    */}
                    <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                        <p className="font-medium">{profile.vendorName} – {profile.role}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
