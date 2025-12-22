"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertItem } from "@/data/admin/alerts";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface AlertsPanelProps {
    alerts: AlertItem[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
    return (
        <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="pb-3">
                <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Operational Alerts
                </CardTitle>
                <CardDescription>Attention required immediately</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="bg-background rounded-lg p-3 border shadow-sm flex items-start gap-3">
                            <div className={`mt-1 h-2 w-2 rounded-full ${alert.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'}`} />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-semibold">{alert.title}</p>
                                <p className="text-xs text-muted-foreground">{alert.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
