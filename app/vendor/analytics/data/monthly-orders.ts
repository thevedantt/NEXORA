export interface MonthlyOrdersData {
    month: string;
    count: number;
    delivered: number;
}

export const MONTHLY_ORDERS_DATA: MonthlyOrdersData[] = [
    { month: "Jan", count: 45, delivered: 42 },
    { month: "Feb", count: 52, delivered: 49 },
    { month: "Mar", count: 48, delivered: 45 },
    { month: "Apr", count: 61, delivered: 58 },
    { month: "May", count: 55, delivered: 51 },
    { month: "Jun", count: 67, delivered: 64 },
    { month: "Jul", count: 72, delivered: 68 },
    { month: "Aug", count: 85, delivered: 80 },
    { month: "Sep", count: 78, delivered: 74 },
    { month: "Oct", count: 91, delivered: 86 },
    { month: "Nov", count: 110, delivered: 104 },
    { month: "Dec", count: 125, delivered: 118 },
];
