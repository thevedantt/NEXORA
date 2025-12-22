"use client";

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Box, User, MapPin, Printer, RefreshCw, Truck, CheckCircle2 } from "lucide-react";
import { Order } from "@/types";

interface OrderDetailsDialogProps {
    order: Order;
    getStatusBadge: (status: string) => React.ReactNode;
}

export function OrderDetailsDialog({ order, getStatusBadge }: OrderDetailsDialogProps) {
    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    {order.id}
                    {getStatusBadge(order.status)}
                </DialogTitle>
                <DialogDescription>
                    Placed on {new Date(order.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
                {/* Items Summary */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Box className="h-4 w-4" /> Order Items
                    </h4>
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-card/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                                <Box className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{order.product}</p>
                                <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-sm">{order.price}</p>
                    </div>
                </div>

                {/* Customer Location */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <User className="h-4 w-4" /> Customer Details
                    </h4>
                    <div className="text-sm space-y-1 p-3 border rounded-lg bg-card/50">
                        <p className="font-medium">{order.customer}</p>
                        <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <span>{order.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                    <Printer className="h-4 w-4" /> Print Label
                </Button>
                {order.status === "Pending" && (
                    <Button className="w-full sm:w-auto gap-2">
                        <RefreshCw className="h-4 w-4" /> Process Order
                    </Button>
                )}
                {order.status === "Processing" && (
                    <Button className="w-full sm:w-auto gap-2">
                        <Truck className="h-4 w-4" /> Mark Shipped
                    </Button>
                )}
                {order.status === "Shipped" && (
                    <Button className="w-full sm:w-auto gap-2" variant="secondary">
                        <CheckCircle2 className="h-4 w-4" /> Mark Delivered
                    </Button>
                )}
            </DialogFooter>
        </DialogContent>
    );
}
