"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUserDB } from "@/context/UserContext";
import { useAIContext } from "@/lib/ai-context";
import { VendorService } from "@/services/vendor.service";
import VendorOrdersLoading from "./loading";
import { Order } from "@/types";

export default function SimpleVendorOrdersPage() {
    const { userDB } = useUserDB();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { setPageName, setContextData } = useAIContext();

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            // Use logged in vendor ID, fallback to undefined for demo/admin view
            const vendorId = userDB?.vendorId || undefined;
            console.log("🛠️ DB Verification: Fetching orders for vendorId:", vendorId);

            const data = await VendorService.getAllOrders(vendorId);
            console.log("📋 DB Response: Found", data.length, "orders");

            setOrders(data);

            // Set AI Context
            setPageName("Vendor Orders");
            setContextData({
                orderCount: data.length,
                lastOrder: data[0]?.customer,
                statusBreakdown: data.reduce((acc: any, o) => {
                    acc[o.status] = (acc[o.status] || 0) + 1;
                    return acc;
                }, {})
            });
        } catch (error) {
            console.error("❌ Failed to fetch database orders", error);
        } finally {
            setLoading(false);
        }
    }, [userDB]);

    useEffect(() => {
        if (userDB) fetchOrders();
    }, [userDB, fetchOrders]);

    if (loading && orders.length === 0) return <VendorOrdersLoading />;

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-6 animate-in fade-in duration-700">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Orders History</h1>
                <p className="text-muted-foreground">Direct view of all orders in the marketplace database.</p>
            </div>

            <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="font-bold">Order ID</TableHead>
                            <TableHead className="font-bold">Customer Name</TableHead>
                            <TableHead className="font-bold">Total Amount</TableHead>
                            <TableHead className="font-bold text-center">Status</TableHead>
                            <TableHead className="font-bold text-right">Created Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                                    No orders found in database for this vendor.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell className="font-mono text-primary font-medium">{order.id}</TableCell>
                                    <TableCell className="font-semibold">{order.customer}</TableCell>
                                    <TableCell className="font-bold text-foreground">{order.price}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className="capitalize">
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">{order.date}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
