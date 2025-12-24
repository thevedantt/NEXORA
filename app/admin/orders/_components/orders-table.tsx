"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
    Eye,
    MoreHorizontal,
    ArrowRightLeft,
    Flag,
    AlertCircle
} from "lucide-react";
import { AdminOrder } from "@/data/admin/orders";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderDetailsDialog } from "./order-details-dialog";
import { EmptyState } from "./empty-state";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrdersTableProps {
    orders: AdminOrder[];
    isLoading: boolean;
}

export function OrdersTable({ orders, isLoading }: OrdersTableProps) {
    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleViewDetails = (order: AdminOrder) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const getSLAIndicator = (status: string) => {
        if (status === "Delayed") {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </TooltipTrigger>
                        <TooltipContent>Delayed beyond SLA</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }
        if (status === "At Risk") {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                        </TooltipTrigger>
                        <TooltipContent>Risk of Delay</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }
        return null;
    };

    return (
        <>
            <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[120px]">Order ID</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead className="hidden md:table-cell">Region</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead className="w-[120px] text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-4 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-[300px] text-center">
                                    <EmptyState />
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="group cursor-pointer hover:bg-muted/30 transition-colors"
                                    onClick={() => handleViewDetails(order)}
                                >
                                    <TableCell className="font-medium text-muted-foreground">{order.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">{order.vendor.name}</span>
                                            <span className="text-xs text-muted-foreground">{order.vendor.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground">{order.customer.region}</TableCell>
                                    <TableCell>
                                        <OrderStatusBadge status={order.status} />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{order.date}</TableCell>
                                    <TableCell>
                                        {getSLAIndicator(order.slaStatus)}
                                    </TableCell>
                                    <TableCell className="text-right p-0 pr-4">
                                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                            onClick={() => handleViewDetails(order)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>View Details</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                            // Logic for reassign would technically open the dialog in reassign mode, 
                                                            // but for now let's just open details. The dialog handles the rest.
                                                            onClick={() => handleViewDetails(order)}
                                                        >
                                                            <ArrowRightLeft className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Reassign Vendor</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleViewDetails(order)}>View Full Details</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-amber-600">
                                                        <Flag className="mr-2 h-4 w-4" /> Flag for Review
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <OrderDetailsDialog
                order={selectedOrder}
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
            />
        </>
    );
}
