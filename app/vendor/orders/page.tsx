"use client";

import React, { useEffect, useState } from "react";
import { OrdersHeader } from "./_components/orders-header";
import { OrdersFilter } from "./_components/orders-filter";
import { OrdersTable } from "./_components/orders-table";
import { VendorService } from "@/services/vendor.service";
import { Order } from "@/types";
import VendorOrdersLoading from "./loading";

export default function VendorOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // Initial Fetch
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await VendorService.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic (Client-side for now, could move to service if data is large)
    const filteredOrders = orders.filter((order) => {
        const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.product.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Wrap simple reload
    const handleRefresh = async () => {
        await fetchOrders();
    };

    // We show the specialized loading screen on initial load
    // But for subsequent refreshes we just show the spinner in the header and the table skeleton
    if (loading && orders.length === 0) return <VendorOrdersLoading />;

    return (
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">

            <OrdersHeader
                onRefresh={handleRefresh}
                isRefreshing={loading}
            />

            <OrdersFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
            />

            <OrdersTable
                orders={filteredOrders}
                isLoading={loading && orders.length === 0} // Only show table skeleton if we have no data
            />

        </div>
    );
}
