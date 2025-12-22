"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface OrdersFilterProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    filterStatus: string;
    setFilterStatus: (value: string) => void;
}

export function OrdersFilter({
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus
}: OrdersFilterProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-card/50 p-1 rounded-lg">
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search orders..."
                    className="pl-9 h-9 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px] h-9 bg-background">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
