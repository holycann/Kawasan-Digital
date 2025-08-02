"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconLayoutDashboard,
    IconBriefcase,
    IconUsers
} from "@tabler/icons-react";

export const DashboardSidebar = () => {
    const [open, setOpen] = useState(false);

    const sidebarLinks = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200" />
        },
        {
            href: "/dashboard/clients",
            label: "Clients",
            icon: <IconUsers className="text-neutral-700 dark:text-neutral-200" />
        },
        {
            href: "/dashboard/projects",
            label: "Projects",
            icon: <IconBriefcase className="text-neutral-700 dark:text-neutral-200" />
        },
    ];

    return (
        <Sidebar open={open} setOpen={setOpen} animate={true}>
            <SidebarBody>
                {sidebarLinks.map((link, index) => (
                    <SidebarLink key={index} link={link} />
                ))}
            </SidebarBody>
        </Sidebar>
    );
};
