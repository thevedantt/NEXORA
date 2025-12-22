import { Order, KPI, OrderStatusCount } from "@/types";

// Mock Data
const ORDERS_DATA: Order[] = [
    { id: "ORD-001", product: "Vintage Leather Satchel", quantity: 1, status: "Pending", date: "2024-10-25", customer: "Alice Freeman", address: "123 Maple Dr, Seattle, WA", price: "$120.00" },
    { id: "ORD-002", product: "Minimalist Ceramic Vase", quantity: 2, status: "Processing", date: "2024-10-24", customer: "Bob Smith", address: "456 Oak Ln, Portland, OR", price: "$45.00" },
    { id: "ORD-003", product: "Merino Wool Scarf", quantity: 1, status: "Shipped", date: "2024-10-23", customer: "Charlie Brown", address: "789 Pine St, San Francisco, CA", price: "$35.00" },
    { id: "ORD-004", product: "Artisan Coffee Mug", quantity: 4, status: "Delivered", date: "2024-10-20", customer: "Diana Prince", address: "321 Cedar Blvd, Austin, TX", price: "$90.00" },
    { id: "ORD-005", product: "Handcrafted Oak Table", quantity: 1, status: "Pending", date: "2024-10-18", customer: "Evan Wright", address: "654 Elm Ct, Denver, CO", price: "$350.00" },
    { id: "ORD-006", product: "Linen Throw Pillow", quantity: 2, status: "Processing", date: "2024-10-25", customer: "Fiona Gallagher", address: "987 Birch Way, Chicago, IL", price: "$60.00" },
];

const KPIS_DATA: KPI[] = [
    { title: "Total Orders", value: "1,284", change: "+12%", trend: "up", iconName: "ShoppingBag" },
    { title: "Revenue", value: "$45,231.89", change: "+4%", trend: "up", iconName: "CreditCard" },
    { title: "Units Sold", value: "3,450", change: "-2%", trend: "down", iconName: "Package" },
    { title: "Pending Orders", value: "12", change: "Requires attention", trend: "neutral", iconName: "Clock", highlight: true },
];

const ORDER_STATUS_COUNTS: OrderStatusCount[] = [
    { status: "Pending", count: 12, colorClass: "bg-[var(--color-pending)]" },
    { status: "Processing", count: 24, colorClass: "bg-[var(--color-processing)]" },
    { status: "Shipped", count: 38, colorClass: "bg-[var(--color-shipped)]" },
    { status: "Delivered", count: 18, colorClass: "bg-[var(--color-delivered)]" },
];

export const VendorService = {
    getKPIs: async (): Promise<KPI[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return KPIS_DATA;
    },

    getOrderStatusCounts: async (): Promise<OrderStatusCount[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return ORDER_STATUS_COUNTS;
    },

    getRecentOrders: async (): Promise<Order[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return ORDERS_DATA.slice(0, 5); // Return top 5
    },

    getAllOrders: async (): Promise<Order[]> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return ORDERS_DATA;
    }
};
