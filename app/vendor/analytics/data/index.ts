
import { ANALYTICS_2024 } from "./analytics-2024";
import { ANALYTICS_2025 } from "./analytics-2025";
import { parseISO, isWithinInterval, format } from "date-fns";

export interface DailyAnalyticsData {
    date: string;
    revenue: number;
    orders: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    stockLevel: number;
    fulfillmentRate: number;
}

const ALL_DATA = [...ANALYTICS_2024, ...ANALYTICS_2025];

export const getFilteredData = (startDate: Date | undefined, endDate: Date | undefined) => {
    if (!startDate) return [];

    // Default to today if no end date
    const end = endDate || startDate;

    // Normalize to handle time zones roughly
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    return ALL_DATA.filter(item => item.date >= startStr && item.date <= endStr);
};

// --- Transformers ---

export const getKPIs = (data: DailyAnalyticsData[]) => {
    const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalOrders = data.reduce((acc, curr) => acc + curr.orders, 0);
    const totalUnits = Math.floor(totalOrders * 1.5); // Mock assumption
    const totalPending = data.reduce((acc, curr) => acc + curr.pending, 0);

    return [
        { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+12.5%", trend: "up" as const, iconName: "CreditCard" },
        { title: "Total Orders", value: totalOrders.toLocaleString(), change: "+8.2%", trend: "up" as const, iconName: "ShoppingBag" },
        { title: "Avg. Delivery", value: "2.4 Days", change: "-0.5", trend: "down" as const, iconName: "Clock" }, // specific visual logic for down being good? keeping simple
        { title: "Fulfillment Rate", value: "98.5%", change: "+1.2%", trend: "up" as const, iconName: "Package" },
    ];
};

export const getSalesChartData = (data: DailyAnalyticsData[]) => {
    return data.map(d => ({
        date: d.date,
        revenue: d.revenue,
        orders: d.orders
    }));
};

export const getOrderStatusData = (data: DailyAnalyticsData[]) => {
    const totals = data.reduce((acc, curr) => ({
        pending: acc.pending + curr.pending,
        processing: acc.processing + curr.processing,
        shipped: acc.shipped + curr.shipped,
        delivered: acc.delivered + curr.delivered
    }), { pending: 0, processing: 0, shipped: 0, delivered: 0 });

    return [
        { status: "Pending", count: totals.pending, fill: "var(--color-pending)" },
        { status: "Processing", count: totals.processing, fill: "var(--color-processing)" },
        { status: "Shipped", count: totals.shipped, fill: "var(--color-shipped)" },
        { status: "Delivered", count: totals.delivered, fill: "var(--color-delivered)" },
    ];
};

export const getMonthlyOrdersData = (data: DailyAnalyticsData[]) => {
    // If range > 32 days, aggregate by month. Else return daily/weekly view logic?
    // For simplicity MVP: if > 60 days, aggregate by month.
    const isBigRange = data.length > 60;

    if (!isBigRange) {
        // Return daily data formatted for the bar chart
        return data.map(d => ({
            month: format(parseISO(d.date), "MMM dd"), // "Apr 01"
            count: d.orders,
            delivered: d.delivered
        }));
    }

    // Aggregate by month
    const monthlyGroups: Record<string, { count: number, delivered: number }> = {};

    data.forEach(d => {
        const monthKey = format(parseISO(d.date), "yyyy-MM"); // "2024-04"
        if (!monthlyGroups[monthKey]) monthlyGroups[monthKey] = { count: 0, delivered: 0 };
        monthlyGroups[monthKey].count += d.orders;
        monthlyGroups[monthKey].delivered += d.delivered;
    });

    return Object.entries(monthlyGroups).map(([key, val]) => ({
        month: format(parseISO(key + "-01"), "MMM yyyy"), // "Apr 2024"
        count: val.count,
        delivered: val.delivered
    }));
};

export const getFulfillmentData = (data: DailyAnalyticsData[]) => {
    // Just map rate
    return data.map(d => ({
        month: format(parseISO(d.date), "MMM dd"),
        rate: d.fulfillmentRate
    }));
};

export const getInventoryData = (data: DailyAnalyticsData[]) => {
    return data.map(d => ({
        date: d.date,
        stockLevel: d.stockLevel
    }));
};
