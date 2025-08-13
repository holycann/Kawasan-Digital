"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    IconUsers,
    IconReportAnalytics,
    IconChartBar,
    IconCoin
} from "@tabler/icons-react";

export default function DashboardPage() {
    const dashboardStats = [
        {
            title: "Total Users",
            value: "1,234",
            icon: <IconUsers className="text-blue-500 w-8 h-8" />
        },
        {
            title: "Active Reports",
            value: "42",
            icon: <IconReportAnalytics className="text-green-500 w-8 h-8" />
        },
        {
            title: "Revenue",
            value: "$45,678",
            icon: <IconCoin className="text-purple-500 w-8 h-8" />
        },
        {
            title: "Performance",
            value: "92%",
            icon: <IconChartBar className="text-orange-500 w-8 h-8" />
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                    <Card key={index} className="bg-white dark:bg-neutral-800 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                {stat.title}
                            </CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                {stat.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="bg-white dark:bg-neutral-800 shadow-md">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for recent activity log */}
                        <div className="text-neutral-500 dark:text-neutral-400">
                            No recent activities.
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-neutral-800 shadow-md">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            Create Report
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                            Add User
                        </button>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition">
                            Generate Analytics
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
