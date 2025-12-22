"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { StockBadge } from "./stock-badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductsTableProps {
    products: Product[];
    isLoading: boolean;
    onEdit: (product: Product) => void;
}

export function ProductsTable({ products, isLoading, onEdit }: ProductsTableProps) {
    return (
        <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[200px]">Product Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                <TableCell><Skeleton className="h-8 w-8 ml-auto rounded-full" /></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        products.map((product) => (
                            <TableRow
                                key={product.id}
                                className="group hover:bg-muted/30 transition-colors"
                            >
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell className="text-muted-foreground font-mono text-xs">{product.sku}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell><StockBadge status={product.status} /></TableCell>
                                <TableCell className="text-right">
                                    <TooltipProvider delayDuration={0}>
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => onEdit(product)}>
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Delete</TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
