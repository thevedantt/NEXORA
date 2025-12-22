"use client";

import { Badge } from "@/components/ui/badge";
import { ProductStatus } from "@/types";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface StockBadgeProps {
    status: ProductStatus;
}

export function StockBadge({ status }: StockBadgeProps) {
    switch (status) {
        case "In Stock":
            return (
                <Badge variant="outline" className="bg-green-500/15 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-900 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> In Stock
                </Badge>
            );
        case "Low Stock":
            return (
                <Badge variant="outline" className="bg-yellow-500/15 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-900 gap-1">
                    <AlertTriangle className="w-3 h-3" /> Low Stock
                </Badge>
            );
        case "Out of Stock":
            return (
                <Badge variant="outline" className="bg-red-500/15 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-900 gap-1">
                    <XCircle className="w-3 h-3" /> Out of Stock
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
