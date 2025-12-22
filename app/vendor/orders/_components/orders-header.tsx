"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface OrdersHeaderProps {
    onRefresh: () => void;
    isRefreshing: boolean;
}

export function OrdersHeader({ onRefresh, isRefreshing }: OrdersHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground text-sm">Manage and fulfill your assigned orders</p>
            </div>
            <div className="flex items-center gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={onRefresh}
                                disabled={isRefreshing}
                            >
                                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Refresh orders</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
