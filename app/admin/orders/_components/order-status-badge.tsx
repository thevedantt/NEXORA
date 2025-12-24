"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Truck, Package, XCircle, AlertCircle } from "lucide-react";
import { OrderStatus } from "@/data/admin/orders";

interface OrderStatusBadgeProps {
    status: OrderStatus | string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    switch (status) {
        case "Delivered":
            return (
                <Badge className="bg-green-600/10 text-green-700 hover:bg-green-600/20 shadow-none border-0 gap-1.5 px-2.5 py-0.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                </Badge>
            );
        case "Processing":
            return (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 gap-1.5 px-2.5 py-0.5 font-medium">
                    <Package className="w-3.5 h-3.5" /> Processing
                </Badge>
            );
        case "Shipped":
            return (
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 gap-1.5 px-2.5 py-0.5 font-medium">
                    <Truck className="w-3.5 h-3.5" /> Shipped
                </Badge>
            );
        case "Pending":
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 gap-1.5 px-2.5 py-0.5 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Pending
                </Badge>
            );
        case "On Hold":
            return (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200 gap-1.5 px-2.5 py-0.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> On Hold
                </Badge>
            );
        case "Cancelled":
            return (
                <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 border hover:border-red-300 shadow-none gap-1.5 px-2.5 py-0.5 font-medium">
                    <XCircle className="w-3.5 h-3.5" /> Cancelled
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
