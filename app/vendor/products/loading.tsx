"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
    return (
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Stock Alert Skeleton */}
            <Skeleton className="h-10 w-full md:w-1/3 rounded-md" />

            {/* Table Skeleton */}
            <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
                <div className="bg-muted/50 h-10 w-full" />
                <div className="p-4 space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
