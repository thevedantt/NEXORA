"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertItem, ADMIN_ALERTS } from "@/data/admin/alerts";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdminAlertsPage() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-destructive flex items-center gap-2">
                        Operational Alerts
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        System-wide notifications and high-priority issues.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                        Dismiss All
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {ADMIN_ALERTS.map((alert) => (
                    <Card key={alert.id} className="border-l-4 border-l-destructive">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        {alert.severity === 'high' && <AlertTriangle className="h-5 w-5 text-destructive" />}
                                        {alert.title}
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        {alert.description}
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="sm">Resolve</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${alert.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                                        alert.severity === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30' :
                                            'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                                    }`}>
                                    {alert.severity.toUpperCase()} Priority
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
