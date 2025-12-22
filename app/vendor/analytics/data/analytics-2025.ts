
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
            revenue: random(2000, 9000),
            orders: random(80, 450),
            // Mocking status distribution for this day
            pending: random(5, 20),
            processing: random(10, 40),
            shipped: random(20, 100),
            delivered: random(40, 300),
            // Mocking inventory
            stockLevel: random(500, 2000),
            // Mocking fulfillment rate
            fulfillmentRate: random(85, 99)
        });
    }
    return data;
};

export const ANALYTICS_2025 = generateDailyData(2025);
