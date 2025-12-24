export type VendorStatus = "Active" | "Pending" | "Paused" | "Suspended";
export type RiskLevel = "Low" | "Medium" | "High";

export interface Vendor {
    id: string;
    name: string;
    email: string;
    status: VendorStatus;
    fulfillmentRate: number; // Percentage 0-100
    totalOrders: number;
    riskLevel: RiskLevel;
    revenue: string;
    joinedDate: string;
    products: number;
}

export const ADMIN_VENDORS: Vendor[] = [
    {
        id: "V-001",
        name: "Acme Living & Co.",
        email: "partners@acme.com",
        status: "Active",
        fulfillmentRate: 98.5,
        totalOrders: 1240,
        riskLevel: "Low",
        revenue: "$45,200",
        joinedDate: "Jan 12, 2024",
        products: 45
    },
    {
        id: "V-002",
        name: "TechGiant Electronics",
        email: "sales@techgiant.io",
        status: "Active",
        fulfillmentRate: 94.2,
        totalOrders: 856,
        riskLevel: "Low",
        revenue: "$128,500",
        joinedDate: "Feb 04, 2024",
        products: 120
    },
    {
        id: "V-003",
        name: "GreenEarth Organics",
        email: "supplies@greenearth.org",
        status: "Pending",
        fulfillmentRate: 0,
        totalOrders: 0,
        riskLevel: "Low",
        revenue: "$0",
        joinedDate: "Dec 20, 2024",
        products: 12
    },
    {
        id: "V-004",
        name: "Urban Threads",
        email: "contact@urbanthreads.com",
        status: "Paused",
        fulfillmentRate: 88.0,
        totalOrders: 432,
        riskLevel: "Medium",
        revenue: "$12,400",
        joinedDate: "Mar 15, 2024",
        products: 28
    },
    {
        id: "V-005",
        name: "FastTrack Logistics",
        email: "ops@fasttrack.net",
        status: "Suspended",
        fulfillmentRate: 76.5,
        totalOrders: 215,
        riskLevel: "High",
        revenue: "$8,900",
        joinedDate: "Nov 10, 2023",
        products: 8
    },
    {
        id: "V-006",
        name: "Luxe Home Decors",
        email: "hello@luxehome.com",
        status: "Active",
        fulfillmentRate: 99.1,
        totalOrders: 3120,
        riskLevel: "Low",
        revenue: "$210,000",
        joinedDate: "Aug 22, 2023",
        products: 85
    },
    {
        id: "V-007",
        name: "Gadget World",
        email: "support@gadgetworld.com",
        status: "Active",
        fulfillmentRate: 92.5,
        totalOrders: 670,
        riskLevel: "Medium",
        revenue: "$54,100",
        joinedDate: "May 30, 2024",
        products: 34
    }
];

// For Dashboard Widget Compatibility
export interface VendorPerformanceItem {
    id: string;
    name: string;
    revenue: string;
    fulfillment: number;
}

export const TOP_VENDORS: VendorPerformanceItem[] = [
    {
        id: "V-006",
        name: "Luxe Home Decors",
        revenue: "$210,000",
        fulfillment: 99.1
    },
    {
        id: "V-001",
        name: "Acme Living & Co.",
        revenue: "$45,200",
        fulfillment: 98.5
    },
    {
        id: "V-002",
        name: "TechGiant Electronics",
        revenue: "$128,500",
        fulfillment: 94.2
    }
];

export const RISK_VENDORS: VendorPerformanceItem[] = [
    {
        id: "V-005",
        name: "FastTrack Logistics",
        revenue: "$8,900",
        fulfillment: 76.5
    },
    {
        id: "V-004",
        name: "Urban Threads",
        revenue: "$12,400",
        fulfillment: 88.0
    }
];
