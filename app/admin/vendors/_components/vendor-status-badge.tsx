"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Ban, PauseCircle, Clock } from "lucide-react";
import { VendorStatus } from "@/data/admin/vendors";

interface VendorStatusBadgeProps {
    status: VendorStatus | string;
}

export function VendorStatusBadge({ status }: VendorStatusBadgeProps) {
    switch (status) {
        case "Active":
            return (
                <Badge className="bg-green-600/10 text-green-600 hover:bg-green-600/20 hover:text-green-700 shadow-none border-0 gap-1.5 px-2.5 py-0.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </Badge>
            );
        case "Pending":
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 hover:border-amber-300 gap-1.5 px-2.5 py-0.5 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Pending
                </Badge>
            );
        case "Paused":
            return (
                <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 gap-1.5 px-2.5 py-0.5 font-medium">
                    <PauseCircle className="w-3.5 h-3.5" /> Paused
                </Badge>
            );
        case "Suspended":
            return (
                <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 border hover:border-red-300 shadow-none gap-1.5 px-2.5 py-0.5 font-medium">
                    <Ban className="w-3.5 h-3.5" /> Suspended
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
