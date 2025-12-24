
export interface Vendor {
    id: string;
    name: string;
    email: string;
    status: "Active" | "Inactive" | "Suspended";
    revenue: string;
    products: number;
    joinedDate: string;
    rating: number;
}

export const ALL_VENDORS: Vendor[] = [
    { id: "VEN-001", name: "Vedant Goods", email: "contact@vedantgoods.com", status: "Active", revenue: "$45,230", products: 124, joinedDate: "Jan 12, 2024", rating: 4.8 },
    { id: "VEN-002", name: "Urban Loft", email: "support@urbanloft.co", status: "Active", revenue: "$32,100", products: 85, joinedDate: "Feb 04, 2024", rating: 4.6 },
    { id: "VEN-003", name: "Modern Living", email: "hello@modernliving.io", status: "Active", revenue: "$28,450", products: 62, joinedDate: "Mar 22, 2024", rating: 4.5 },
    { id: "VEN-004", name: "Retro Furnish", email: "sales@retrofurnish.net", status: "Suspended", revenue: "$12,300", products: 45, joinedDate: "Apr 10, 2024", rating: 3.2 },
    { id: "VEN-005", name: "Decor Haven", email: "info@decorhaven.com", status: "Inactive", revenue: "$5,200", products: 28, joinedDate: "May 15, 2024", rating: 3.9 },
    { id: "VEN-006", name: "EcoStyle Home", email: "partners@ecostyle.org", status: "Active", revenue: "$8,900", products: 33, joinedDate: "Jun 01, 2024", rating: 4.9 },
    { id: "VEN-007", name: "Luxe Interiors", email: "biz@luxeinteriors.com", status: "Active", revenue: "$55,120", products: 156, joinedDate: "Dec 10, 2023", rating: 4.7 },
];
