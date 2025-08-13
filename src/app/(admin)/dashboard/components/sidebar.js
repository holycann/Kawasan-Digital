"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconLayoutDashboard,
    IconBriefcase,
    IconUsers,
    IconLogout,
    IconHome,
    IconPlus,
    IconCategory,
    IconCode
} from "@tabler/icons-react";
import { useAuth } from "@/hooks/useAuth";

export const DashboardSidebar = () => {
    const [open, setOpen] = useState(false);
    const { signOut } = useAuth();

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
            icon: <IconBriefcase className="text-neutral-700 dark:text-neutral-200" />,
            sublinks: [
                {
                    href: "/dashboard/projects/categories",
                    label: "Categories",
                    icon: <IconCategory className="text-neutral-700 dark:text-neutral-200" />
                },
                {
                    href: "/dashboard/projects/tech_stack",
                    label: "Tech Stack",
                    icon: <IconCode className="text-neutral-700 dark:text-neutral-200" />
                },
            ]
        }
    ];

    const additionalLinks = [
        {
            href: "/",
            label: "Back to Home",
            icon: <IconHome className="text-neutral-700 dark:text-neutral-200" />,
            onClick: null
        },
        {
            href: "#",
            label: "Logout",
            icon: <IconLogout className="text-neutral-700 dark:text-neutral-200" />,
            onClick: signOut
        }
    ];

    return (
        <Sidebar open={open} setOpen={setOpen} animate={true}>
            <SidebarBody>
                {sidebarLinks.map((link, index) => (
                    <SidebarLink key={index} link={link} />
                ))}
                <div className="mt-auto">
                    {additionalLinks.map((link, index) => (
                        <SidebarLink
                            key={`additional-${index}`}
                            link={link}
                        />
                    ))}
                </div>
            </SidebarBody>
        </Sidebar>
    );
};
