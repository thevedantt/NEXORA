
export interface AdminKPI {
    title: string;
    value: string;
    subtext: string;
    trend: "up" | "down" | "neutral";
    iconName: "DollarSign" | "ShoppingBag" | "Users" | "Package" | "AlertTriangle";
}

export const ADMIN_KPIS: AdminKPI[] = [
    { title: "Total Revenue", value: "$1,245,390", subtext: "+15% from last month", trend: "up", iconName: "DollarSign" },
    { title: "Total Orders", value: "12,450", subtext: "+8% from last month", trend: "up", iconName: "ShoppingBag" },
    { title: "Active Vendors", value: "84", subtext: "4 new this week", trend: "up", iconName: "Users" },
    { title: "Avg Fulfillment", value: "94.2%", subtext: "-1.1% from last month", trend: "down", iconName: "Package" },
];
