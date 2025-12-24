"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { AdminOrder } from "@/data/admin/orders";
import { OrderStatusBadge } from "./order-status-badge";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    CreditCard,
    MapPin,
    Package,
    User,
    Store,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReassignmentPanel } from "./reassignment-panel";

interface OrderDetailsDialogProps {
    order: AdminOrder | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
    const [viewMode, setViewMode] = useState<"details" | "reassign">("details");

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) {
            setViewMode("details"); // Reset on close
        }
        onOpenChange(isOpen);
    };

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <div className="p-6 pb-4 bg-muted/30 border-b space-y-4">
                    <DialogHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <DialogTitle className="text-xl flex items-center gap-2">
                                    {order.id}
                                    {order.flagged && (
                                        <Badge variant="destructive" className="ml-2 h-5 text-[10px] px-1.5 uppercase">Flagged</Badge>
                                    )}
                                </DialogTitle>
                                <DialogDescription className="flex items-center gap-2">
                                    Placed on {order.date}
                                </DialogDescription>
                            </div>
                            <OrderStatusBadge status={order.status} />
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-6">
                    {viewMode === "details" ? (
                        <div className="space-y-6">
                            {/* Actions Header */}
                            {order.status !== "Delivered" && order.status !== "Cancelled" && (
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 text-primary"
                                        onClick={() => setViewMode("reassign")}
                                    >
                                        <Store className="h-4 w-4" /> Reassign Vendor
                                    </Button>
                                </div>
                            )}

                            {/* Customer & Shipping */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <User className="h-4 w-4" /> Customer
                                    </h4>
                                    <div className="text-sm space-y-1">
                                        <p className="font-medium text-foreground">{order.customer.name}</p>
                                        <p className="text-muted-foreground">{order.customer.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Shipping Region
                                    </h4>
                                    <p className="text-sm font-medium">{order.customer.region}</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Package className="h-4 w-4" /> Order Info
                                    </h4>
                                    <div className="text-sm space-y-1">
                                        <p>{order.items} Items</p>
                                        <p className="font-medium text-foreground">{order.total}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Store className="h-4 w-4" /> Vendor
                                    </h4>
                                    <div className="text-sm space-y-1">
                                        <p className="font-medium text-foreground">{order.vendor.name}</p>
                                        <p className="text-muted-foreground">{order.vendor.id}</p>
                                    </div>
                                </div>
                            </div>

                            {/* SLA Status */}
                            <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                                <span className="text-sm font-medium flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" /> SLA Status
                                </span>
                                <Badge variant={order.slaStatus === "Delayed" ? "destructive" : order.slaStatus === "At Risk" ? "outline" : "secondary"} className={
                                    order.slaStatus === "At Risk" ? "border-amber-200 text-amber-700 bg-amber-50" : ""
                                }>
                                    {order.slaStatus}
                                </Badge>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Reassign Order</h3>
                            <ReassignmentPanel
                                currentVendorId={order.vendor.id}
                                onCancel={() => setViewMode("details")}
                                onComplete={() => {
                                    setTimeout(() => handleClose(false), 500);
                                }}
                            />
                        </div>
                    )}
                </div>

                {viewMode === "details" && (
                    <div className="p-4 bg-muted/30 border-t flex justify-end gap-2">
                        <Button variant="outline" onClick={() => handleClose(false)}>Close</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
