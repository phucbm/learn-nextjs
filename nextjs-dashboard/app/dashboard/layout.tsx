import {SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from '@/app/ui/dashboard/sidenav';
import React from "react";
import {CustomTrigger} from "@/app/ui/dashboard/custom-sidebar-trigger";

export const experimental_ppr = true;

export default async function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main className="p-3 md:p-6 w-full">
                    <CustomTrigger/>
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
}