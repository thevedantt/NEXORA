"use client";

import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

interface EmptyStateProps {
    onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-96 border rounded-md border-dashed bg-muted/10 p-8 text-center animate-in fade-in duration-500">
            <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <PackageX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No products added yet</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
                Your catalog is empty. Add your first product to start selling on Nexora.
            </p>
            <Button onClick={onAdd}>Add your first product</Button>
        </div>
    );
}
