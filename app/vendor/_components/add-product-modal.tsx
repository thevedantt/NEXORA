"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useUserDB } from "@/context/UserContext";
import axios from "axios";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
    const { userDB } = useUserDB();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload = {
            vendorId: userDB?.vendorId,
            name: formData.get("name"),
            sku: formData.get("sku"),
            priceINR: formData.get("priceINR"),
            stock: parseInt(formData.get("stock") as string),
            status: formData.get("status") || "IN_STOCK",
        };

        try {
            setIsSubmitting(true);
            const res = await axios.post("/api/vendor/products", payload);
            if (res.status === 200 || res.status === 201) {
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error("Failed to add product:", error);
            alert("Failed to add product. Please check your inputs.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            Enter the details for your new product. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" placeholder="e.g. Premium Silk Saree" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sku">SKU Code</Label>
                            <Input id="sku" name="sku" placeholder="e.g. SK-101" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="priceINR">Price (₹)</Label>
                                <Input id="priceINR" name="priceINR" type="number" step="0.01" placeholder="0.00" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stock">Initial Stock</Label>
                                <Input id="stock" name="stock" type="number" placeholder="0" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Availability</Label>
                            <Select name="status" defaultValue="IN_STOCK">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IN_STOCK">In Stock</SelectItem>
                                    <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
                                    <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Product
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
