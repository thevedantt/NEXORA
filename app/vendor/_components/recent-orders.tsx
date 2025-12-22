"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import { Order } from "@/types";

interface RecentOrdersProps {
    orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg">Recent Orders</CardTitle>
                    <CardDescription>Manage your active orders</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex gap-1 group">
                    View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium text-primary">{order.id}</TableCell>
                                <TableCell className="font-semibold">{order.product}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        style={{
                                            backgroundColor: `color-mix(in srgb, var(--color-${order.status.toLowerCase()}), transparent 85%)`,
                                            color: `var(--color-${order.status.toLowerCase()})`,
                                            borderColor: `color-mix(in srgb, var(--color-${order.status.toLowerCase()}), transparent 50%)`,
                                        }}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">{order.date}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
