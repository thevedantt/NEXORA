"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ActivityItem } from "@/data/admin/activity";
import { ShoppingCart, UserPlus, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
    data: ActivityItem[];
}

export function ActivityFeed({ data }: ActivityFeedProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case "order": return <ShoppingCart className="h-4 w-4" />;
            case "vendor": return <UserPlus className="h-4 w-4" />;
            case "alert": return <AlertCircle className="h-4 w-4" />;
            default: return <Info className="h-4 w-4" />;
        }
    };

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Live operational updates</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4"> // reduced spacing for compactness
                    {data.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                            <div className={cn(
                                "rounded-full p-2 mt-0.5",
                                item.status === "success" && "bg-green-600 text-white shadow-sm",
                                item.status === "warning" && "bg-amber-500 text-white shadow-sm",
                                item.status === "error" && "bg-red-600 text-white shadow-sm"
                            )}>
                                {getIcon(item.type)}
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {item.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
