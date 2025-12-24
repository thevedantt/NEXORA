"use client";

import { useEffect, useState } from "react";
import { OrdersTable } from "./_components/orders-table";
import { OrdersFilter } from "./_components/orders-filter";
import { ADMIN_ORDERS, AdminOrder } from "@/data/admin/orders";
import { Button } from "@/components/ui/button";
import { RotateCw, Calendar } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAIContext } from "@/lib/ai-context";

export default function AdminOrdersPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<AdminOrder[]>([]);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [vendorFilter, setVendorFilter] = useState("all");

    // AI Context Integration
    const { setPageName, setUserRole, setContextData } = useAIContext();

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/orders");
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API Error ${res.status}: ${text.substring(0, 100)}`);
            }
            const data = await res.json();
            if (Array.isArray(data)) {
                setOrders(data);
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setPageName("Admin Orders");
        setUserRole("admin");
        fetchOrders();
    }, []);

    const handleRefresh = () => {
        fetchOrders();
    };

    // Filter Logic
    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesVendor = vendorFilter === "all" || order.vendor.id === vendorFilter;

        return matchesSearch && matchesStatus && matchesVendor;
    });

    // Update context when data changes
    useEffect(() => {
        if (!isLoading) {
            setContextData({
                totalOrders: orders.length,
                filteredCount: filteredOrders.length,
                delayedOrders: orders.filter(o => o.slaStatus === "Delayed").length,
                pendingOrders: orders.filter(o => o.status === "Pending").length,
                filters: {
                    status: filterStatus,
                    vendor: vendorFilter
                }
            });
        }
    }, [orders, filteredOrders, filterStatus, vendorFilter, isLoading]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground text-sm">
                        Monitor and manage all marketplace orders
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 bg-secondary/50 px-3 py-1.5 rounded-full border hidden sm:flex">
                        <Calendar className="h-3 w-3" /> Real-time
                    </span>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRefresh}>
                                    <RotateCw className={`h-4 w-4 text-muted-foreground ${isLoading ? 'animate-spin' : ''}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Refresh Orders</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* Filters */}
            <OrdersFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                vendorFilter={vendorFilter}
                setVendorFilter={setVendorFilter}
            />

            {/* Content */}
            <OrdersTable orders={filteredOrders} isLoading={isLoading} />
        </div>
    );
}
