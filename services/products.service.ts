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
    highlight?: boolean;
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

// Mock Data for Services
const PRODUCTS_DATA: Product[] = [
    { id: "PRD-001", name: "Vintage Leather Satchel", sku: "VLS-001", price: "120.00", stock: 45, status: "In Stock" },
    { id: "PRD-002", name: "Minimalist Ceramic Vase", sku: "MCV-002", price: "45.00", stock: 8, status: "Low Stock" },
    { id: "PRD-003", name: "Merino Wool Scarf", sku: "MWS-003", price: "35.00", stock: 120, status: "In Stock" },
    { id: "PRD-004", name: "Artisan Coffee Mug", sku: "ACM-004", price: "25.00", stock: 0, status: "Out of Stock" },
    { id: "PRD-005", name: "Handcrafted Oak Table", sku: "HOT-005", price: "350.00", stock: 2, status: "Low Stock" },
];

export const ProductsService = {
    getAllProducts: async (): Promise<Product[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return PRODUCTS_DATA;
    },

    getLowStockCount: async (): Promise<number> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return PRODUCTS_DATA.filter(p => p.status === "Low Stock").length;
    }
};
