"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OrderStatusCount } from "@/types";

interface OrderStatusProgressProps {
    data: OrderStatusCount[];
}

export function OrderStatusProgress({ data }: OrderStatusProgressProps) {
    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <Card className="flex flex-col h-[480px] shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight">Order Status</CardTitle>
                <CardDescription className="text-sm font-medium">
                    Live tracking of current order distribution across stages
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-around py-6 px-8">
                {data.map((item) => {
                    const percentage = total > 0 ? (item.count / total) * 100 : 0;

                    // Map background classes to color variables if needed, 
                    // or use inline styles for the progress bar color
                    const colorHex = item.colorClass.match(/#([A-Fa-f0-9]{6})/) ? item.colorClass.match(/#([A-Fa-f0-9]{6})/)?.[0] : '#3b82f6';

                    return (
                        <div key={item.status} className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-4 w-4 rounded-full ring-2 ring-background shadow-sm"
                                        style={{ backgroundColor: colorHex }}
                                    />
                                    <span className="font-bold text-base">{item.status}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-black text-lg">{item.count}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Orders</span>
                                </div>
                            </div>
                            <Progress
                                value={percentage}
                                className="h-2.5 bg-muted/30"
                                style={{
                                    "--progress-foreground": colorHex,
                                    // Hack to force color if the Progress component supports it via CSS variable
                                    background: `rgba(0,0,0,0.05)`
                                } as any}
                            />
                        </div>
                    );
                })}

                {total === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground/60 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center opacity-20">
                            <div className="w-6 h-6 border-2 border-current rounded-full" />
                        </div>
                        <p className="text-sm font-medium italic">No active orders to track</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
