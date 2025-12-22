
export interface AlertItem {
    id: string;
    title: string;
    description: string;
    severity: "high" | "medium" | "low";
}

export const ADMIN_ALERTS: AlertItem[] = [
    { id: "a1", title: "5 Orders Stuck", description: "Orders pending > 48h in fulfillment", severity: "high" },
    { id: "a2", title: "Low Stock Warning", description: "3 vendors typically low on inventory", severity: "medium" },
    { id: "a3", title: "SLA Breach", description: "Response time drop in Support Queue", severity: "medium" },
];
