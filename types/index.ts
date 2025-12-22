export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

export interface Order {
    id: string;
    product: string;
    quantity: number;
    status: OrderStatus;
    date: string;
    customer: string;
    address: string;
    price: string;
}

export interface KPI {
    title: string;
    value: string | number;
    change: string;
    trend: "up" | "down" | "neutral";
    iconName: "ShoppingBag" | "CreditCard" | "Package" | "Clock";
    highlight?: boolean; // For primary colored cards
}

export interface OrderStatusCount {
    status: OrderStatus;
    count: number;
    colorClass: string;
}

export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: string;
    stock: number;
    status: ProductStatus;
}
