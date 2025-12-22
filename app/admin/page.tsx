"use client";

import React, { useEffect, useState } from "react";
import { AdminKPIs } from "./_components/admin-kpis";
import { ActivityFeed } from "./_components/activity-feed";
import { VendorPerformance } from "./_components/vendor-performance";
import { AlertsPanel } from "./_components/alerts-panel";
import AdminDashboardLoading from "./loading";
import { RotateCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Data Imports
import { ADMIN_KPIS } from "@/data/admin/kpis";
import { ADMIN_ACTIVITY } from "@/data/admin/activity";
import { TOP_VENDORS, RISK_VENDORS } from "@/data/admin/vendors";
import { ADMIN_ALERTS } from "@/data/admin/alerts";

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <AdminDashboardLoading />;

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground text-sm">
                        Marketplace overview and operational status
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 bg-secondary/50 px-3 py-1.5 rounded-full border">
                        <Calendar className="h-3 w-3" /> Today
                    </span>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.location.reload()}>
                                    <RotateCw className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Refresh Data</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* KPIs */}
            <AdminKPIs data={ADMIN_KPIS} />

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Left Column (Feed + Performance) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-5 flex flex-col gap-4">
                    {/* Alerts - High Priority (shown at top of feed column on mobile/tablet) */}
                    <div className="lg:hidden">
                        <AlertsPanel alerts={ADMIN_ALERTS} />
                    </div>

                    <ActivityFeed data={ADMIN_ACTIVITY} />
                    <VendorPerformance topVendors={TOP_VENDORS} riskVendors={RISK_VENDORS} />
                </div>

                {/* Right Column (Alerts + ??) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
                    <div className="hidden lg:block">
                        <AlertsPanel alerts={ADMIN_ALERTS} />
                    </div>

                    {/* Placeholder for future widgets or ads */}
                    <div className="border border-dashed rounded-lg h-64 flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
                        Additional Admin Widgets (Coming Soon)
                    </div>
                </div>
            </div>
        </div>
    );
}
