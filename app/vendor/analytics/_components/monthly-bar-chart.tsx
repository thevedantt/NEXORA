"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { MonthlyOrdersData } from "../data/monthly-orders";

interface MonthlyBarChartProps {
    data: MonthlyOrdersData[];
}

const chartConfig = {
    count: {
        label: "Total Orders",
        color: "hsl(var(--chart-1))",
    },
    delivered: {
        label: "Delivered",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders vs Delivered</CardTitle>
                <CardDescription>Monthly fulfillment performance comparison</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="count" fill="var(--color-orders)" radius={4} />
                        <Bar dataKey="delivered" fill="var(--color-delivered)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    High delivery rate maintained <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing comparison for the last 12 months
                </div>
            </CardFooter>
        </Card>
    );
}
