
export interface ActivityItem {
    id: string;
    timestamp: string;
    description: string;
    type: "order" | "vendor" | "alert" | "system";
    status?: "success" | "warning" | "error";
}

export const ADMIN_ACTIVITY: ActivityItem[] = [
    { id: "1", timestamp: "Just now", description: "Order #ORD-9921 shipped by Vedant Goods", type: "order", status: "success" },
    { id: "2", timestamp: "15 min ago", description: "New vendor application: 'EcoStyle Home'", type: "vendor", status: "success" },
    { id: "3", timestamp: "1h ago", description: "Stock alert: 'Vintage Lamp' (SKU-123) is out of stock", type: "alert", status: "warning" },
    { id: "4", timestamp: "2h ago", description: "Order #ORD-9918 flagged for review (High Value)", type: "order", status: "warning" },
    { id: "5", timestamp: "4h ago", description: "Monthly payouts processed successfully", type: "system", status: "success" },
];
