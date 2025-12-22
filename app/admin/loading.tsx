"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function AdminDashboardLoading() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
            <div className="flex flex-col gap-1">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                    <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                    <CardContent className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                    <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                    <CardContent className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </CardContent>
                </Card>

                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        </div>
    )
}
