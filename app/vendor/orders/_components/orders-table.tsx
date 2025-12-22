"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle, RefreshCw, Truck, CheckCircle2, PackageCheck, Eye } from "lucide-react";
import { Order } from "@/types";
import { OrderDetailsDialog } from "./order-details-dialog";

interface OrdersTableProps {
    orders: Order[];
    isLoading: boolean;
}

export function OrdersTable({ orders, isLoading }: OrdersTableProps) {

    const getStatusBadge = (status: string) => {
        const getStyle = (variable: string) => ({
            backgroundColor: `color-mix(in srgb, var(${variable}), transparent 85%)`,
            color: `var(${variable})`,
            borderColor: `color-mix(in srgb, var(${variable}), transparent 50%)`,
        });

        switch (status) {
            case "Pending":
                return <Badge variant="outline" style={getStyle('--color-pending')} className="gap-1"><AlertCircle className="w-3 h-3" /> Pending</Badge>;
            case "Processing":
                return <Badge variant="outline" style={getStyle('--color-processing')} className="gap-1"><RefreshCw className="w-3 h-3" /> Processing</Badge>;
            case "Shipped":
                return <Badge variant="outline" style={getStyle('--color-shipped')} className="gap-1"><Truck className="w-3 h-3" /> Shipped</Badge>;
            case "Delivered":
                return <Badge variant="outline" style={getStyle('--color-delivered')} className="gap-1"><CheckCircle2 className="w-3 h-3" /> Delivered</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[120px]">Order ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="w-[100px] text-center">Qty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        // Skeleton State
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                </TableCell>
                                <TableCell><Skeleton className="h-4 w-8 mx-auto" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                            </TableRow>
                        ))
                    ) : orders.length === 0 ? (
                        // Empty State
                        <TableRow>
                            <TableCell colSpan={6} className="h-60 text-center">
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                                        <PackageCheck className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium">No orders found</p>
                                        <p className="text-sm text-muted-foreground">Adjust your filters or check back later.</p>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        // Data Rows
                        orders.map((order) => (
                            <TableRow
                                key={order.id}
                                className="group cursor-pointer hover:bg-muted/30 transition-colors"
                            >
                                <TableCell className="font-medium text-primary">{order.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.product}</span>
                                        <span className="text-xs text-muted-foreground md:hidden">{order.date}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground">{order.quantity}</TableCell>
                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{order.date}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 data-[state=open]:opacity-100"
                                            >
                                                <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                            </Button>
                                        </DialogTrigger>
                                        <OrderDetailsDialog order={order} getStatusBadge={getStatusBadge} />
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
