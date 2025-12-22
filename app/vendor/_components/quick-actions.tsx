"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingBag, Printer, CheckCircle } from "lucide-react";

export function QuickActions() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Frequent tasks</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                    <Button className="w-full justify-start gap-3 h-12 text-base font-medium shadow-sm transition-all hover:scale-[1.02]" variant="default">
                        <Plus className="h-5 w-5" /> Add Product
                    </Button>
                    <Button className="w-full justify-start gap-3 h-12 text-base font-medium shadow-sm transition-all hover:scale-[1.02]" variant="secondary">
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
        </>
    );
}
