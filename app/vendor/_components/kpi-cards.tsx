"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ShoppingBag, CreditCard, Package, Clock } from "lucide-react";
import { KPI } from "@/types";
import { cn } from "@/lib/utils";

const iconMap = {
    ShoppingBag,
    CreditCard,
    Package,
    Clock,
};

interface VendorKpisProps {
    data: KPI[];
}

export function VendorKpis({ data }: VendorKpisProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((kpi, index) => {
                const Icon = iconMap[kpi.iconName];
                return (
                    <Card
                        key={index}
                        className={cn(
                            "hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                            kpi.highlight && "bg-primary/5 border-primary/20"
                        )}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className={cn("text-sm font-medium", kpi.highlight && "text-primary")}>
                                {kpi.title}
                            </CardTitle>
                            <Icon className={cn("h-4 w-4 text-muted-foreground", kpi.highlight && "text-primary")} />
                        </CardHeader>
                        <CardContent>
                            <div className={cn("text-2xl font-bold", kpi.highlight && "text-primary")}>
                                {kpi.value}
                            </div>
                            <p className={cn("text-xs text-muted-foreground flex items-center gap-1 mt-1", kpi.highlight && "text-primary/80")}>
                                {kpi.trend === "up" && (
                                    <span className="text-green-600 font-medium flex items-center">
                                        {kpi.change} <TrendingUp className="h-3 w-3 ml-0.5" />
                                    </span>
                                )}
                                {kpi.trend === "down" && (
                                    <span className="text-destructive font-medium flex items-center">
                                        {kpi.change}
                                    </span>
                                )}
                                {kpi.trend === "neutral" && (
                                    <span>{kpi.change}</span>
                                )}
                                {kpi.trend !== "neutral" && " from last month"}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
