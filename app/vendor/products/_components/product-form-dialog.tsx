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
import { Product } from "@/types";
import { useEffect, useState } from "react";

interface ProductFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productToEdit?: Product | null;
}

export function ProductFormDialog({ open, onOpenChange, productToEdit }: ProductFormDialogProps) {
    const isEdit = !!productToEdit;

    // Simple state form handling (would use reactor-hook-form in prod)
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setSku(productToEdit.sku);
            setPrice(productToEdit.price);
            setStock(productToEdit.stock.toString());
        } else {
            // Reset
            setName("");
            setSku("");
            setPrice("");
            setStock("");
        }
    }, [productToEdit, open]);

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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sku" className="text-right">
                            SKU
                        </Label>
                        <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <div className="col-span-3 relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="pl-7" type="number" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                            Stock
                        </Label>
                        <Input id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="col-span-3" type="number" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" onClick={() => onOpenChange(false)}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
