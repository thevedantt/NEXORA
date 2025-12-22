export interface OrderStatusData {
    status: string;
    count: number;
    fill: string;
}

export const ORDERS_STATUS_DATA: OrderStatusData[] = [
    { status: "Pending", count: 12, fill: "var(--color-pending)" },
    { status: "Processing", count: 24, fill: "var(--color-processing)" },
    { status: "Shipped", count: 38, fill: "var(--color-shipped)" },
    { status: "Delivered", count: 18, fill: "var(--color-delivered)" },
];
