"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
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
import { OrderStatusData } from "../data/orders-status";

interface OrdersPieChartProps {
    data: OrderStatusData[];
}

const chartConfig = {
    count: {
        label: "Orders",
    },
    Pending: {
        label: "Pending",
        color: "hsl(var(--chart-1))",
    },
    Processing: {
        label: "Processing",
        color: "hsl(var(--chart-2))",
    },
    Shipped: {
        label: "Shipped",
        color: "hsl(var(--chart-3))",
    },
    Delivered: {
        label: "Delivered",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

export function OrdersPieChart({ data }: OrdersPieChartProps) {
    const totalOrders = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.count, 0);
    }, [data]);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Order Status Breakdown</CardTitle>
                <CardDescription>Current distribution of order statuses</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalOrders.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Orders
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Most orders are Shipped <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total orders for the current period
                </div>
            </CardFooter>
        </Card>
    );
}
