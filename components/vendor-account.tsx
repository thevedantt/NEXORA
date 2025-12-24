"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton, useUser } from "@clerk/nextjs";
import { VendorProfile } from "@/data/vendor/profile";

interface VendorAccountProps {
    profile: VendorProfile;
}

export function VendorAccount({ profile }: VendorAccountProps) {
    const { user } = useUser();
    return (
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-3 cursor-default">
                            <div className="flex items-center justify-center min-w-9">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-9 w-9"
                                        }
                                    }}
                                />
                            </div>

                            {/* Text content - Hidden when collapsed */}
                            <div className="flex flex-col text-sm leading-tight group-data-[collapsible=icon]:hidden overflow-hidden">
                                <span className="font-semibold truncate">{user?.fullName || profile.vendorName}</span>
                                <span className="text-[10px] font-medium uppercase text-[#781c2e]/70 tracking-wider">Vendor</span>
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
