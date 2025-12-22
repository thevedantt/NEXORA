"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function VendorOrdersLoading() {
    return (
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-muted/20 p-1 rounded-lg">
                <Skeleton className="h-9 w-full sm:w-72 rounded-md" />
                <Skeleton className="h-9 w-full sm:w-[180px] rounded-md" />
            </div>

            <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
                <div className="bg-muted/50 h-10 w-full" />
                <div className="p-4 space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex justify-between">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24 hidden md:block" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
