export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "On Hold";
export type SLAStatus = "On Track" | "At Risk" | "Delayed";

export interface AdminOrder {
    id: string;
    customer: {
        name: string;
        email: string;
        region: string;
    };
    vendor: {
        id: string;
        name: string;
    };
    items: number;
    total: string;
    status: OrderStatus;
    date: string;
    slaStatus: SLAStatus;
    flagged?: boolean;
}

export const ADMIN_ORDERS: AdminOrder[] = [
    {
        id: "ORD-2024-001",
        customer: { name: "Alice Freeman", email: "alice.f@example.com", region: "North America" },
        vendor: { id: "V-001", name: "Acme Living & Co." },
        items: 3,
        total: "$250.00",
        status: "Processing",
        date: "2024-12-23",
        slaStatus: "On Track"
    },
    {
        id: "ORD-2024-002",
        customer: { name: "Bob Smith", email: "bob.s@example.com", region: "Europe" },
        vendor: { id: "V-005", name: "FastTrack Logistics" },
        items: 1,
        total: "$45.00",
        status: "Pending",
        date: "2024-12-22",
        slaStatus: "Delayed",
        flagged: true
    },
    {
        id: "ORD-2024-003",
        customer: { name: "Charlie Davis", email: "charlie.d@example.com", region: "Asia Pacific" },
        vendor: { id: "V-002", name: "TechGiant Electronics" },
        items: 2,
        total: "$1,200.00",
        status: "Shipped",
        date: "2024-12-20",
        slaStatus: "On Track"
    },
    {
        id: "ORD-2024-004",
        customer: { name: "Diana Prince", email: "diana.p@example.com", region: "Europe" },
        vendor: { id: "V-004", name: "Urban Threads" },
        items: 5,
        total: "$320.00",
        status: "On Hold",
        date: "2024-12-18",
        slaStatus: "At Risk",
        flagged: true
    },
    {
        id: "ORD-2024-005",
        customer: { name: "Evan Wright", email: "evan.w@example.com", region: "North America" },
        vendor: { id: "V-001", name: "Acme Living & Co." },
        items: 1,
        total: "$85.00",
        status: "Delivered",
        date: "2024-12-15",
        slaStatus: "On Track"
    },
    {
        id: "ORD-2024-006",
        customer: { name: "Fiona Gallagher", email: "fiona.g@example.com", region: "South America" },
        vendor: { id: "V-006", name: "Luxe Home Decors" },
        items: 4,
        total: "$890.00",
        status: "Processing",
        date: "2024-12-23",
        slaStatus: "On Track"
    },
    {
        id: "ORD-2024-007",
        customer: { name: "George Martin", email: "george.m@example.com", region: "Europe" },
        vendor: { id: "V-005", name: "FastTrack Logistics" },
        items: 2,
        total: "$120.00",
        status: "Pending",
        date: "2024-12-21",
        slaStatus: "Delayed"
    }
];
