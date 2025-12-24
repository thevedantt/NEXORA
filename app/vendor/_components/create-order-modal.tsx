"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useUserDB } from "@/context/UserContext";
import axios from "axios";

interface CreateOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateOrderModal({ isOpen, onClose, onSuccess }: CreateOrderModalProps) {
    const { userDB } = useUserDB();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload = {
            vendorId: userDB?.vendorId,
            customerName: formData.get("customerName"),
            customerCity: formData.get("customerCity"),
            customerState: formData.get("customerState"),
            totalAmountINR: formData.get("totalAmount"),
            status: "PENDING",
        };

        try {
            setIsSubmitting(true);
            const res = await axios.post("/api/vendor/orders", payload);
            if (res.status === 200 || res.status === 201) {
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error("Failed to create order:", error);
            alert("Failed to create order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Bulk Order</DialogTitle>
                        <DialogDescription>
                            Manually create a new order for your store.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Input id="customerName" name="customerName" placeholder="e.g. John Doe" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="customerCity">City</Label>
                                <Input id="customerCity" name="customerCity" placeholder="Mumbai" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="customerState">State</Label>
                                <Input id="customerState" name="customerState" placeholder="Maharashtra" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="totalAmount">Total Amount (₹)</Label>
                            <Input id="totalAmount" name="totalAmount" type="number" step="0.01" placeholder="0.00" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Order
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
