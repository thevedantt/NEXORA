"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingBag, Printer, CheckCircle } from "lucide-react";
import { useState } from "react";
import { AddProductModal } from "./add-product-modal";
import { CreateOrderModal } from "./create-order-modal";

interface QuickActionsProps {
    onActionComplete?: () => void;
}

export function QuickActions({ onActionComplete }: QuickActionsProps) {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Frequent tasks</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                    <Button
                        onClick={() => setIsAddProductOpen(true)}
                        className="w-full justify-start gap-3 h-12 text-base font-medium shadow-sm transition-all hover:scale-[1.02]"
                        variant="default"
                    >
                        <Plus className="h-5 w-5" /> Add Product
                    </Button>
                    <Button
                        onClick={() => setIsCreateOrderOpen(true)}
                        className="w-full justify-start gap-3 h-12 text-base font-medium shadow-sm transition-all hover:scale-[1.02]"
                        variant="secondary"
                    >
                        <ShoppingBag className="h-5 w-5" /> Create Order
                    </Button>
                    <Button className="w-full justify-start gap-3 h-12 text-base font-medium shadow-sm transition-all hover:scale-[1.02]" variant="secondary">
                        <Printer className="h-5 w-5" /> Generate Label
                    </Button>
                    <Button className="w-full justify-start gap-3 h-12 text-base font-medium shadow-sm transition-all hover:scale-[1.02]" variant="outline">
                        <CheckCircle className="h-5 w-5" /> Mark Picked Up
                    </Button>
                </CardContent>
            </Card>

            <AddProductModal
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onSuccess={() => onActionComplete?.()}
            />

            <CreateOrderModal
                isOpen={isCreateOrderOpen}
                onClose={() => setIsCreateOrderOpen(false)}
                onSuccess={() => onActionComplete?.()}
            />
        </>
    );
}
