"use client";

import React, { useEffect, useState, useCallback } from "react";
import { VendorKpis } from "./_components/kpi-cards";
import { OrderStatusProgress } from "./_components/order-status-progress";
import { RecentOrders } from "./_components/recent-orders";
import { QuickActions } from "./_components/quick-actions";
import { VendorService } from "@/services/vendor.service";
import { KPI, Order, OrderStatusCount } from "@/types";
import VendorLoading from "./loading";
import { useUserDB } from "@/context/UserContext";
import { useAIContext } from "@/lib/ai-context";

export default function VendorDashboard() {
    const { userDB } = useUserDB();
    const [kpis, setKpis] = useState<KPI[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [statusCounts, setStatusCounts] = useState<OrderStatusCount[]>([]);
    const [loading, setLoading] = useState(true);
    const { setPageName, setContextData } = useAIContext();

    const fetchData = useCallback(async () => {
        try {
            // If we have a vendorId in DB, use it, otherwise the API will pick a default for demo
            const vendorId = userDB?.vendorId || undefined;

            const data = await VendorService.getDashboardData(vendorId);

            setKpis(data.kpis);
            setOrders(data.orders);
            setStatusCounts(data.statusCounts);

            // Set AI Context
            setPageName("Vendor Dashboard");
            setContextData({
                totalOrders: data.kpis.find((k: any) => k.title === "Total Orders")?.value,
                revenue: data.kpis.find((k: any) => k.title === "Revenue")?.value,
                recentOrders: data.orders.length
            });
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    }, [userDB]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) return <VendorLoading />;

    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto animate-in fade-in duration-700 pb-10">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Vendor Dashboard</h1>
                <p className="text-muted-foreground text-lg">
                    Overview of your orders and performance
                </p>
            </div>

            {/* KPI Cards */}
            <VendorKpis data={kpis} />

            <div className="grid gap-8 md:grid-cols-7">
                <div className="col-span-1 md:col-span-5 flex flex-col gap-8">
                    {/* Order Status Progress */}
                    <OrderStatusProgress data={statusCounts} />

                    {/* Recent Orders Table */}
                    <RecentOrders orders={orders} />
                </div>

                {/* Quick Actions */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
                    <QuickActions onActionComplete={fetchData} />
                </div>
            </div>
        </div>
    );
}
