"use client";

import React, { useEffect, useState, useMemo } from "react";
import { startOfToday, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { MoveUpRight } from "lucide-react";

import { AnalyticsKPIs } from "./_components/analytics-kpis";
import { SalesLineChart } from "./_components/sales-line-chart";
import { OrdersPieChart } from "./_components/orders-pie-chart";
import { MonthlyBarChart } from "./_components/monthly-bar-chart";
import { FulfillmentAreaChart } from "./_components/fulfillment-area-chart";
import { InventoryStepChart } from "./_components/inventory-step-chart";
import { DateFilter } from "./_components/date-filter";
import AnalyticsLoading from "./loading";

import {
    getFilteredData,
    getKPIs,
    getSalesChartData,
    getOrderStatusData,
    getMonthlyOrdersData,
    getFulfillmentData,
    getInventoryData
} from "./data";

export default function VendorAnalyticsPage() {
    const today = startOfToday();
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(today, 29),
        to: today,
    });

    // Simulate initial loading only
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Filter data based on selected range
    const filteredData = useMemo(() => {
        return getFilteredData(dateRange?.from, dateRange?.to);
    }, [dateRange]);

    // Derived State
    const kpiData = useMemo(() => getKPIs(filteredData), [filteredData]);
    const salesData = useMemo(() => getSalesChartData(filteredData), [filteredData]);
    const statusData = useMemo(() => getOrderStatusData(filteredData), [filteredData]);
    const monthlyData = useMemo(() => getMonthlyOrdersData(filteredData), [filteredData]);
    const fulfillmentData = useMemo(() => getFulfillmentData(filteredData), [filteredData]);
    const inventoryData = useMemo(() => getInventoryData(filteredData), [filteredData]);

    if (loading) return <AnalyticsLoading />;

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        Analytics <MoveUpRight className="h-4 w-4 text-muted-foreground/50" />
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Track your sales and performance metrics
                    </p>
                </div>
                {/* Date Control */}
                <DateFilter date={dateRange} setDate={setDateRange} />
            </div>

            {/* KPIs - Dynamic */}
            <AnalyticsKPIs data={kpiData} />

            {/* Top Row Charts */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                <div className="col-span-4">
                    <SalesLineChart data={salesData} />
                </div>
                <div className="col-span-3">
                    <OrdersPieChart data={statusData} />
                </div>
            </div>

            {/* Bottom Row Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                <MonthlyBarChart data={monthlyData} />
                <FulfillmentAreaChart data={fulfillmentData} />
            </div>

            {/* Stock / Inventory */}
            <div className="grid gap-4 md:grid-cols-1">
                <InventoryStepChart data={inventoryData} />
            </div>
        </div>
    );
}
