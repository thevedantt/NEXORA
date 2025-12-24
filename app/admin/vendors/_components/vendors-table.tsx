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
    PauseCircle,
    PlayCircle,
    AlertTriangle,
    ShieldCheck,
    ShieldAlert
} from "lucide-react";
import { Vendor } from "@/data/admin/vendors";
import { VendorStatusBadge } from "./vendor-status-badge";
import { VendorDetailsDialog } from "./vendor-details-dialog";
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
import { EmptyState } from "./empty-state";

interface VendorsTableProps {
    vendors: Vendor[];
    isLoading: boolean;
}

export function VendorsTable({ vendors, isLoading }: VendorsTableProps) {
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleViewDetails = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setIsDetailsOpen(true);
    };

    const getRiskBadge = (risk: string) => {
        switch (risk) {
            case "Low":
                return <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 gap-1 font-normal"><ShieldCheck className="w-3 h-3" /> Low</Badge>;
            case "Medium":
                return <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50 gap-1 font-normal"><AlertTriangle className="w-3 h-3" /> Medium</Badge>;
            case "High":
                return <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 gap-1 font-normal"><ShieldAlert className="w-3 h-3" /> High</Badge>;
            default:
                return <span className="text-muted-foreground">{risk}</span>;
        }
    };

    const getFulfillmentColor = (rate: number) => {
        if (rate >= 95) return "text-green-600";
        if (rate >= 80) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <>
            <div className="border rounded-md bg-card shadow-sm overflow-hidden flex-1">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[250px]">Vendor Name</TableHead>
                            <TableHead className="w-[120px]">Status</TableHead>
                            <TableHead className="text-right">Fulfillment Rate</TableHead>
                            <TableHead className="text-right">Total Orders</TableHead>
                            <TableHead className="w-[120px]">Risk Level</TableHead>
                            <TableHead className="w-[140px] text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            // Skeleton State
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-48" />
                                        </div>
                                    </TableCell>
                                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : vendors.length === 0 ? (
                            // Empty State
                            <TableRow>
                                <TableCell colSpan={6} className="h-[400px] text-center">
                                    <EmptyState />
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Data Rows
                            vendors.map((vendor) => (
                                <TableRow
                                    key={vendor.id}
                                    className="group cursor-pointer hover:bg-muted/30 transition-colors h-[72px]"
                                    onClick={() => handleViewDetails(vendor)}
                                >
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">{vendor.name}</span>
                                            <span className="text-xs text-muted-foreground">{vendor.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <VendorStatusBadge status={vendor.status} />
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        <span className={getFulfillmentColor(vendor.fulfillmentRate)}>
                                            {vendor.fulfillmentRate}%
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">
                                        {vendor.totalOrders.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {getRiskBadge(vendor.riskLevel)}
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
                                                            onClick={() => handleViewDetails(vendor)}
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
                                                        >
                                                            {vendor.status === "Paused" ? (
                                                                <PlayCircle className="h-4 w-4" />
                                                            ) : (
                                                                <PauseCircle className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {vendor.status === "Paused" ? "Resume Vendor" : "Pause Vendor"}
                                                    </TooltipContent>
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
                                                    <DropdownMenuItem onClick={() => handleViewDetails(vendor)}>View Full Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>View Products</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">Suspend Vendor</DropdownMenuItem>
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

            <VendorDetailsDialog
                vendor={selectedVendor}
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
            />
        </>
    );
}
