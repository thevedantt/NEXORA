"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function VendorLoading() {
    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-10">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-96" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-7">
                <div className="col-span-1 md:col-span-5 flex flex-col gap-8">
                    <Card className="h-64">
                        <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                        <CardContent><Skeleton className="h-full w-full" /></CardContent>
                    </Card>
                    <Card className="h-96">
                        <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                        <CardContent><Skeleton className="h-full w-full" /></CardContent>
                    </Card>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Card className="h-96">
                        <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
