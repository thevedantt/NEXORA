"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto w-full pb-10 animate-in fade-in duration-700">
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
                <p className="text-muted-foreground text-sm">
                    Configure global marketplace settings and preferences.
                </p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Configuration</CardTitle>
                        <CardDescription>
                            Basic platform information and branding.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">Maintenance Mode</label>
                                <p className="text-sm text-muted-foreground">Temporarily disable the marketplace for all users.</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">New Vendor Registration</label>
                                <p className="text-sm text-muted-foreground">Allow new vendors to sign up automatically.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 px-6 py-4">
                        <Button size="sm">Save Changes</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            Manage system-wide email and alert preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">Order Alert Emails</label>
                                <p className="text-sm text-muted-foreground">Receive daily summaries of new orders.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
