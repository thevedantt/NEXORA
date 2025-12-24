"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersLoading() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
            {/* Header Loading */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>

            {/* Filter Loading */}
            <div className="w-full bg-card p-4 rounded-lg border shadow-sm h-[72px] flex items-center gap-4">
                <Skeleton className="h-10 w-full md:w-64" />
                <Skeleton className="h-10 w-[160px]" />
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-10 w-[240px] ml-auto" />
            </div>

            {/* Table Loading */}
            <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
                <div className="bg-muted/50 p-4 border-b">
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[120px] ml-auto" />
                    </div>
                </div>
                <div className="p-4 space-y-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <Skeleton className="h-4 w-24" />
                            <div className="space-y-1 flex-1 max-w-[200px]">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-20 ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
