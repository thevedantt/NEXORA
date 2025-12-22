"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Package, AlertTriangle, TrendingUp } from "lucide-react";
import { AdminKPI } from "@/data/admin/kpis";
import { cn } from "@/lib/utils";

const iconMap = {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    AlertTriangle,
};

interface AdminKPIsProps {
    data: AdminKPI[];
}

export function AdminKPIs({ data }: AdminKPIsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((kpi, index) => {
                const Icon = iconMap[kpi.iconName] || Package;
                return (
                    <Card
                        key={index}
                        className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
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
                            <p className="text-xs text-muted-foreground flex items-center mt-1 gap-1">
                                {kpi.trend === "up" && (
                                    <span className="text-green-600 font-medium flex items-center">
                                        <TrendingUp className="h-3 w-3 mr-1" /> {kpi.subtext}
                                    </span>
                                )}
                                {kpi.trend === "down" && (
                                    <span className="text-red-600 font-medium flex items-center">
                                        <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> {kpi.subtext}
                                    </span>
                                )}
                                {kpi.trend === "neutral" && (
                                    <span>{kpi.subtext}</span>
                                )}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
