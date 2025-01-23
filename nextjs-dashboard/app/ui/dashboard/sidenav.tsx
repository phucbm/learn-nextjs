import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu
} from "@/components/ui/sidebar";
import React from "react";
import CustomSideBarFooter from "@/app/ui/dashboard/custom-side-bar-footer";

export default async function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b bg-blue-500 text-white pl-3 pr-3">
                <AcmeLogo/>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <NavLinks/>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
                <CustomSideBarFooter/>
            </SidebarFooter>
        </Sidebar>
    );
}