"use client";

import { ShieldAlert } from "lucide-react";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center space-y-3 h-[400px]">
            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                <ShieldAlert className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1 text-center">
                <p className="font-medium">No vendors added yet</p>
                <p className="text-sm text-muted-foreground">Add your first vendor to start monitoring.</p>
            </div>
        </div>
    );
}
