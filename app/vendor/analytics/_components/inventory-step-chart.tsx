"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
} from "@/components/ui/chart";
import { InventoryEvent } from "../data/inventory";

interface InventoryStepChartProps {
    data: InventoryEvent[];
}

const chartConfig = {
    stockLevel: {
        label: "Stock Level",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export function InventoryStepChart({ data }: InventoryStepChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory Trend</CardTitle>
                <CardDescription>
                    Stock level changes over time (sales & restocks)
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
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="stockLevel"
                            type="step"
                            stroke="var(--color-stockLevel)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Restock event on Apr 12 <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Accurate representation of inventory drops
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
