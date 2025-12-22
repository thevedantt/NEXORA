"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import { FulfillmentData } from "../data/fulfillment";

interface FulfillmentAreaChartProps {
    data: FulfillmentData[];
}

const chartConfig = {
    rate: {
        label: "Rate (%)",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function FulfillmentAreaChart({ data }: FulfillmentAreaChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fulfillment Performance</CardTitle>
                <CardDescription>
                    Tracking fulfillment success rate over time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="rate"
                            type="natural"
                            fill="var(--color-rate)"
                            fillOpacity={0.4}
                            stroke="var(--color-rate)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Consistently above 90% <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - December 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
