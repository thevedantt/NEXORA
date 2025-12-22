"use client";
import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart";
import { SalesData } from "../data/sales";

interface SalesLineChartProps {
    data: SalesData[];
}

const chartConfig = {
    revenue: {
        label: "Revenue ($)",
        color: "hsl(var(--chart-1))",
    },
    orders: {
        label: "Orders",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function SalesLineChart({ data }: SalesLineChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sales & Orders Trend</CardTitle>
                <CardDescription>
                    Daily comparisons of revenue and order volume
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                            dataKey="revenue"
                            type="monotone" // changed from "smooth" which is not valid recharts prop (monotone or natural)
                            stroke="var(--color-revenue)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="orders"
                            type="monotone"
                            stroke="var(--color-orders)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
