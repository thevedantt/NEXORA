export interface InventoryEvent {
    date: string;
    stockLevel: number;
}

export const INVENTORY_DATA: InventoryEvent[] = [
    { date: "2024-04-01", stockLevel: 450 },
    { date: "2024-04-05", stockLevel: 380 },
    { date: "2024-04-10", stockLevel: 380 },
    { date: "2024-04-12", stockLevel: 500 }, // Restock
    { date: "2024-04-15", stockLevel: 420 },
    { date: "2024-04-20", stockLevel: 350 },
    { date: "2024-04-25", stockLevel: 290 },
    { date: "2024-04-28", stockLevel: 290 },
    { date: "2024-04-30", stockLevel: 210 },
];
