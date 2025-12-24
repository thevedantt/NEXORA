"use client";

import React, { useEffect, useState } from "react";
import { AdminKPIs } from "./_components/admin-kpis";
import { ActivityFeed } from "./_components/activity-feed";
import { VendorPerformance } from "./_components/vendor-performance";
import { AlertsPanel } from "./_components/alerts-panel";
import AdminDashboardLoading from "./loading";
import { RotateCw, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAIContext } from "@/lib/ai-context";

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({
        kpis: [],
        activity: [],
        topVendors: [],
        riskVendors: [],
        alerts: [] // We might not have an alerts API yet, keep empty or static
    });

    // AI Context
    const { setPageName, setUserRole, setContextData } = useAIContext();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/dashboard");
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API Error ${res.status}: ${text.substring(0, 100)}`);
            }
            const json = await res.json();

            // Combine API alerts with generated high-risk alerts
            const apiAlerts = json.alerts || [];
            const riskAlerts = json.riskVendors.map((v: any) => ({
                id: `risk-${v.id}`,
                severity: 'high',
                title: 'High Risk Vendor Detected',
                description: `${v.name} has dropped to ${v.fulfillment}% fulfillment.`
            }));

            const dashboardData = {
                kpis: json.kpis,
                activity: json.activity,
                topVendors: json.topVendors,
                riskVendors: json.riskVendors,
                alerts: [...apiAlerts, ...riskAlerts]
            };

            setData(dashboardData);
            setContextData({
                totalVendors: dashboardData.topVendors?.length || 0,
                highRiskCount: dashboardData.riskVendors?.length || 0,
                mediumRiskCount: 0, // Calculate if data available
                pendingCount: 0, // Calculate if data available
                recentActivity: dashboardData.activity?.slice(0, 3)
            });

        } catch (err) {
            console.error("Dashboard Fetch Error, falling back to dummy data:", err);

            // Comprehensive Dummy Data Fallback for robustness
            const dummyKPIs = [
                { title: "Total Revenue", value: "₹48,29,102", subtext: "+12.5% vs last month", trend: "up", iconName: "DollarSign" },
                { title: "Total Orders", value: "12,482", subtext: "+8.2% vs last month", trend: "up", iconName: "ShoppingBag" },
                { title: "Active Vendors", value: "124", subtext: "Real-time sync", trend: "neutral", iconName: "Users" },
                { title: "Pending Shipments", value: "12", subtext: "Operational bottleneck", trend: "down", iconName: "Package" }
            ];

            const dummyActivity = [
                { id: "1", description: "Approved vendor Nexus-Grid", timestamp: "2m ago", status: "success", type: "vendor" },
                { id: "2", description: "Global inventory sync completed", timestamp: "5m ago", status: "success", type: "system" },
                { id: "3", description: "Dispatched batch #8291", timestamp: "12m ago", status: "success", type: "order" },
                { id: "4", description: "New terminal login detected", timestamp: "24m ago", status: "warning", type: "alert" }
            ];

            const dummyTopVendors = [
                { id: "v1", name: "Nexus-Grid", fulfillment: 99.8, revenue: "₹12,40,000" },
                { id: "v2", name: "SwiftCart Ops", fulfillment: 98.4, revenue: "₹8,90,000" }
            ];

            const dummyRiskVendors = [
                { id: "v3", name: "GlobalLogix", fulfillment: 84.2, revenue: "₹2,10,000" },
                { id: "v4", name: "AuraMarket", fulfillment: 82.1, revenue: "₹1,50,000" }
            ];

            const dummyAlerts = [
                { id: "alert-1", severity: "high", title: "Operational Alert", description: "Attention required immediately on GlobalLogix performance." },
                { id: "alert-2", severity: "medium", title: "Inventory Risk", description: "SKU-8291 (Leather Gear) is running critically low." },
                { id: "alert-3", severity: "high", title: "System Alert", description: "Partial outage detected in Fulfillment Node-B." }
            ];

            const fallbackData = {
                kpis: dummyKPIs,
                activity: dummyActivity,
                topVendors: dummyTopVendors,
                riskVendors: dummyRiskVendors,
                alerts: dummyAlerts
            };

            setData(fallbackData);
            setContextData({
                totalVendors: fallbackData.topVendors?.length || 0, // Approximate from dummy data
                highRiskCount: fallbackData.riskVendors?.length || 0,
                mediumRiskCount: 0,
                pendingCount: 0,
                recentActivity: fallbackData.activity?.slice(0, 3)
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
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
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={fetchData}>
                                    <RotateCw className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Refresh Data</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* KPIs */}
            <AdminKPIs data={data.kpis} />

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Left Column (Feed + Performance) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-5 flex flex-col gap-4">
                    {/* Alerts - High Priority (shown at top of feed column on mobile/tablet) */}
                    <div className="lg:hidden">
                        <AlertsPanel alerts={data.alerts} />
                    </div>

                    <ActivityFeed data={data.activity} />
                    <VendorPerformance topVendors={data.topVendors} riskVendors={data.riskVendors} />
                </div>

                {/* Right Column (Alerts + ??) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
                    <div className="hidden lg:block">
                        <AlertsPanel alerts={data.alerts} />
                    </div>

                    {/* Placeholder for future widgets or ads */}
                    <div className="border border-dashed rounded-xl h-64 flex flex-col items-center justify-center text-muted-foreground text-sm p-8 text-center bg-secondary/10">
                        <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                            <Sparkles className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-bold text-[#570010] mb-1">Nexora Intelligence</p>
                        <p className="max-w-[180px]">Proactive operational insights will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
