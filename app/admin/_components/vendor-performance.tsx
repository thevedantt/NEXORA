"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VendorPerformanceItem } from "@/data/admin/vendors";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface VendorPerformanceProps {
    topVendors: VendorPerformanceItem[];
    riskVendors: VendorPerformanceItem[];
}

export function VendorPerformance({ topVendors, riskVendors }: VendorPerformanceProps) {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col">
            <CardHeader>
                <CardTitle>Vendor Performance</CardTitle>
                <CardDescription>Top performers & at-risk accounts</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-4 w-4" /> Top Performing
                    </h4>
                    <div className="space-y-2">
                        {topVendors.map((vendor) => (
                            <div key={vendor.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-secondary/20">
                                <span className="font-medium">{vendor.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">{vendor.revenue}</span>
                                    <Badge className="bg-green-600 text-white hover:bg-green-700 shadow-sm border-0">
                                        {vendor.fulfillment}% Fulfilled
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" /> At Risk
                    </h4>
                    <div className="space-y-2">
                        {riskVendors.map((vendor) => (
                            <div key={vendor.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-destructive/10">
                                <span className="font-medium">{vendor.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">{vendor.revenue}</span>
                                    <Badge className="bg-red-600 text-white hover:bg-red-700 shadow-sm border-0">
                                        {vendor.fulfillment}% Fulfilled
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
