
// Helper to generate deterministic data
const generateDailyData = (year: number) => {
    const data = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        // Deterministic pseudo-random based on date
        const seed = d.getTime();
        const random = (min: number, max: number) => Math.floor((Math.sin(seed) + 1) / 2 * (max - min) + min);

        data.push({
            date: dateStr,
            revenue: random(1500, 7000), // Slightly lower for 2024
            orders: random(50, 350),
            pending: random(2, 15),
            processing: random(5, 30),
            shipped: random(15, 80),
            delivered: random(30, 250),
            stockLevel: random(300, 1500),
            fulfillmentRate: random(80, 95)
        });
    }
    return data;
};

export const ANALYTICS_2024 = generateDailyData(2024);
