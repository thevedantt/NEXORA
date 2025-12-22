"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Truck, Package, CreditCard, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
    DollarSign,
    CreditCard,
    ShoppingBag,
    Truck,
    Package,
    Clock
};

export interface KPIItem {
    title: string;
    value: string;
    change?: string;
    trend?: "up" | "down" | "neutral";
    iconName: string;
}

interface AnalyticsKPIsProps {
    data: KPIItem[];
}

export function AnalyticsKPIs({ data }: AnalyticsKPIsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((kpi, index) => {
                const Icon = iconMap[kpi.iconName] || Package;
                return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {kpi.title}
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div key={kpi.value} className="text-2xl font-bold animate-in fade-in slide-in-from-bottom-1 duration-500">
                                {kpi.value}
                            </div>
                            {kpi.change && (
                                <p className="text-xs text-muted-foreground flex items-center mt-1">
                                    <span className={cn(
                                        "font-medium flex items-center mr-1",
                                        kpi.trend === "up" ? "text-green-600" :
                                            kpi.trend === "down" ? "text-red-600" : "text-muted-foreground"
                                    )}>
                                        {kpi.change}
                                        {kpi.trend === "up" && <TrendingUp className="h-3 w-3 ml-0.5" />}
                                    </span>
                                    vs last period
                                </p>
                            )}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
}
