
export interface VendorPerformanceItem {
    id: string;
    name: string;
    fulfillment: number;
    status: "Excellent" | "Good" | "At Risk" | "Critical";
    revenue: string;
}

export const TOP_VENDORS: VendorPerformanceItem[] = [
    { id: "v1", name: "Vedant Goods", fulfillment: 98.5, status: "Excellent", revenue: "$45,230" },
    { id: "v2", name: "Urban Loft", fulfillment: 97.2, status: "Excellent", revenue: "$32,100" },
    { id: "v3", name: "Modern Living", fulfillment: 95.8, status: "Good", revenue: "$28,450" },
];

export const RISK_VENDORS: VendorPerformanceItem[] = [
    { id: "v4", name: "Retro Furnish", fulfillment: 82.1, status: "At Risk", revenue: "$12,300" },
    { id: "v5", name: "Decor Haven", fulfillment: 76.4, status: "Critical", revenue: "$5,200" },
];
