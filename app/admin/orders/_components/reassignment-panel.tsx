"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ArrowRightLeft, CheckCircle2 } from "lucide-react";
import { ADMIN_VENDORS } from "@/data/admin/vendors";

interface ReassignmentPanelProps {
    currentVendorId: string;
    onComplete: () => void;
    onCancel: () => void;
}

export function ReassignmentPanel({ currentVendorId, onComplete, onCancel }: ReassignmentPanelProps) {
    const [selectedVendor, setSelectedVendor] = useState<string>("");
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const availableVendors = ADMIN_VENDORS.filter(v => v.id !== currentVendorId && v.status === "Active");

    const handleSubmit = () => {
        if (!selectedVendor) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                onComplete();
            }, 1000);
        }, 1200);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-8 space-y-3 animate-in fade-in zoom-in">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="text-center space-y-1">
                    <h3 className="font-medium text-lg">Reassignment Complete</h3>
                    <p className="text-sm text-muted-foreground">Order has been transferred successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 pt-2">
            <div className="bg-amber-50 border border-amber-100 rounded-md p-3 flex gap-3 text-sm text-amber-900">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <p>
                    Reassigning an order will transfer full fulfillment responsibility to the new vendor.
                    The current vendor will be notified immediately.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label>Select New Vendor</Label>
                    <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose a vendor..." />
                        </SelectTrigger>
                        <SelectContent>
                            {availableVendors.map(vendor => (
                                <SelectItem key={vendor.id} value={vendor.id}>
                                    {vendor.name} ({vendor.fulfillmentRate}% Fulfilled)
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Reason for Reassignment (Optional)</Label>
                    <Textarea
                        placeholder="e.g., Original vendor out of stock, SLA breach..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="resize-none h-20"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    disabled={!selectedVendor || isSubmitting}
                    className="gap-2"
                >
                    {isSubmitting ? "Processing..." : (
                        <>
                            <ArrowRightLeft className="h-4 w-4" /> Confirm Transfer
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
