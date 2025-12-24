"use client";

import { useEffect, useState } from "react";
import { VendorsTable } from "./_components/vendors-table";
import { ADMIN_VENDORS, Vendor } from "@/data/admin/vendors";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import { AddVendorDialog } from "./_components/add-vendor-dialog";
import { useAIContext } from "@/lib/ai-context";

export default function VendorsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);

    // AI Context
    const { setPageName, setUserRole, setContextData } = useAIContext();

    const fetchVendors = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/vendors");
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API Error ${res.status}: ${text.substring(0, 100)}`);
            }
            const data = await res.json();
            if (Array.isArray(data)) {
                setVendors(data);
            }
        } catch (error) {
            console.error("Failed to fetch vendors, using fallback data:", error);
            setVendors(ADMIN_VENDORS);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setPageName("Admin Vendors");
        setUserRole("admin");
        fetchVendors();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setContextData({
                totalVendors: vendors.length,
                highRiskCount: vendors.filter(v => v.riskLevel === 'High').length,
                mediumRiskCount: vendors.filter(v => v.riskLevel === 'Medium').length,
                pendingCount: vendors.filter(v => v.status === 'Pending').length,
            });
        }
    }, [vendors, isLoading]);

    // Quick Performance Indicators Calculation
    const healthyCount = vendors.filter(v => v.riskLevel === 'Low').length;
    const watchCount = vendors.filter(v => v.riskLevel === 'Medium').length;
    const atRiskCount = vendors.filter(v => v.riskLevel === 'High').length;

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Vendors</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage and monitor marketplace vendors
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Quick Performance Indicators (only show when data is loaded) */}
                    {!isLoading && (
                        <div className="hidden md:flex items-center gap-3 text-sm mr-2 bg-muted/30 px-3 py-1.5 rounded-full border">
                            <div className="flex items-center gap-1.5 text-green-700">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="font-medium">{healthyCount}</span> Healthy
                            </div>
                            <div className="w-px h-3 bg-border" />
                            <div className="flex items-center gap-1.5 text-yellow-700">
                                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                                <span className="font-medium">{watchCount}</span> Watch
                            </div>
                            <div className="w-px h-3 bg-border" />
                            <div className="flex items-center gap-1.5 text-red-700">
                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                <span className="font-medium">{atRiskCount}</span> At Risk
                            </div>
                        </div>
                    )}

                    <Button
                        size="sm"
                        className="h-9 gap-1 bg-primary text-primary-foreground shadow"
                        onClick={() => setIsAddVendorOpen(true)}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Add Vendor</span>
                    </Button>
                </div>
            </div>

            {/* Content */}
            <VendorsTable vendors={vendors} isLoading={isLoading} />

            <AddVendorDialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen} />
        </div>
    );
}
