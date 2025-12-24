"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function VendorsLoading() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
            {/* Page Header Loading */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-9 w-32" />
            </div>

            {/* Table Loading */}
            <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
                <div className="bg-muted/50 p-4 border-b">
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-24 ml-auto" />
                        <Skeleton className="h-4 w-24 ml-auto" />
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[140px] ml-auto" />
                    </div>
                </div>
                <div className="p-4 space-y-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-4 w-12 ml-auto" />
                            <Skeleton className="h-4 w-16 ml-auto" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-8 w-24 ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
