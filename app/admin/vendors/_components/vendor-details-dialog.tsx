"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Vendor } from "@/data/admin/vendors";
import { VendorStatusBadge } from "./vendor-status-badge";
import { BarChart3, Mail, MapPin, Package, ShieldAlert, ShoppingBag, DollarSign } from "lucide-react";

interface VendorDetailsDialogProps {
    vendor: Vendor | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function VendorDetailsDialog({ vendor, open, onOpenChange }: VendorDetailsDialogProps) {
    if (!vendor) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <div className="p-6 pb-4 bg-muted/30 border-b">
                    <DialogHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <DialogTitle className="text-xl">{vendor.name}</DialogTitle>
                                <DialogDescription className="flex items-center gap-2">
                                    <span className="text-sm">{vendor.id}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Mail className="h-3 w-3" /> {vendor.email}
                                    </span>
                                </DialogDescription>
                            </div>
                            <VendorStatusBadge status={vendor.status} />
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-6 grid gap-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <DollarSign className="h-3 w-3" /> Revenue
                            </p>
                            <p className="text-2xl font-semibold tracking-tight">{vendor.revenue}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <ShoppingBag className="h-3 w-3" /> Total Orders
                            </p>
                            <p className="text-2xl font-semibold tracking-tight">{vendor.totalOrders}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <BarChart3 className="h-3 w-3" /> Fulfillment
                            </p>
                            <div className={`text-2xl font-semibold tracking-tight ${vendor.fulfillmentRate >= 95 ? "text-green-600" :
                                    vendor.fulfillmentRate >= 80 ? "text-yellow-600" : "text-red-600"
                                }`}>
                                {vendor.fulfillmentRate}%
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Operational Status & Issues */}
                    <div className="space-y-4">
                        <h4 className="font-medium flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4" /> Risk Assessment
                        </h4>

                        <div className="grid gap-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-card text-sm">
                                <span className="text-muted-foreground">Current Risk Level</span>
                                <span className={`font-medium px-2 py-1 rounded-md text-xs ${vendor.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                                        vendor.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {vendor.riskLevel.toUpperCase()}
                                </span>
                            </div>

                            {vendor.riskLevel !== 'Low' && (
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-amber-900 text-sm">
                                    <p className="font-medium mb-1">Attention Needed</p>
                                    <p className="opacity-90">
                                        {vendor.riskLevel === 'Medium'
                                            ? "Fulfillment rate has dropped below 90% in the last 30 days."
                                            : "Multiple unresolved customer disputes and fulfillment delays."}
                                    </p>
                                </div>
                            )}

                            {vendor.riskLevel === 'Low' && (
                                <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-900 text-sm">
                                    <p className="font-medium mb-1">Healthy Performance</p>
                                    <p className="opacity-90">Vendor is maintaining high standards across all metrics.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-muted/30 border-t flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button variant="default" onClick={() => onOpenChange(false)}>View Full Profile</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
