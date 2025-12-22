"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusCount } from "@/types";

interface OrderStatusProgressProps {
    data: OrderStatusCount[];
}

export function OrderStatusProgress({ data }: OrderStatusProgressProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-base">Order Status</CardTitle>
                <CardDescription className="text-xs">Live tracking of current order distribution</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="flex flex-col gap-3">
                    {/* Progress Bar Visual */}
                    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-secondary/30">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={`h-full ${item.colorClass}`}
                                style={{ width: `${(item.count / 92) * 100}%` }} // simplistic percentage calc for mockup
                                title={item.status}
                            />
                        ))}
                    </div>

                    {/* Legend / Segments */}
                    <div className="grid grid-cols-4 gap-2">
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1.5">
                                    <div className={`h-1.5 w-1.5 rounded-full ${item.colorClass}`} /> {item.status}
                                </span>
                                <span className="text-sm font-bold">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
