"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useUserDB } from "@/context/UserContext";
import axios from "axios";

interface ProductFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productToEdit?: Product | null;
    onSuccess?: () => void;
}

export function ProductFormDialog({ open, onOpenChange, productToEdit, onSuccess }: ProductFormDialogProps) {
    const { userDB } = useUserDB();
    const isEdit = !!productToEdit;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [status, setStatus] = useState("IN_STOCK");

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setSku(productToEdit.sku);
            const rawPrice = productToEdit.price.replace(/[^\d.]/g, '');
            setPrice(rawPrice);
            setStock(productToEdit.stock.toString());
            setStatus(productToEdit.status === "In Stock" ? "IN_STOCK" : productToEdit.status === "Low Stock" ? "LOW_STOCK" : "OUT_OF_STOCK");
        } else {
            setName("");
            setSku("");
            setPrice("");
            setStock("");
            setStatus("IN_STOCK");
        }
    }, [productToEdit, open]);

    const handleSave = async () => {
        if (!userDB?.vendorId) return;

        try {
            setIsSubmitting(true);
            const payload = {
                vendorId: userDB.vendorId,
                name,
                sku,
                priceINR: price,
                stock: parseInt(stock),
                status
            };

            if (isEdit) {
                // In a real app we'd have a PUT /api/vendor/products/[id]
                // For now let's just use POST to simulate or keep it simple
                await axios.post("/api/vendor/products", payload);
            } else {
                await axios.post("/api/vendor/products", payload);
            }

            if (onSuccess) onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Error saving product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Make changes to your product here. Click save when you're done." : "Add a new product to your catalog."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU-123" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" value={stock} onChange={(e) => setStock(e.target.value)} type="number" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
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
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEdit ? "Update Product" : "Save Product"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
