"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-28 rounded-xl" />
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Skeleton className="col-span-4 h-[350px] rounded-xl" />
                <Skeleton className="col-span-3 h-[350px] rounded-xl" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-[300px] rounded-xl" />
                <Skeleton className="h-[300px] rounded-xl" />
            </div>
        </div>
    );
}
