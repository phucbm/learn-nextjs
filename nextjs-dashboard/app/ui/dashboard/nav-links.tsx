'use client';

import {Home, Users, FileText} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";

const links = [
    {name: 'Home', href: '/dashboard', icon: Home},
    {name: 'Invoices', href: '/dashboard/invoices', icon: FileText},
    {name: 'Customers', href: '/dashboard/customers', icon: Users},
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                return (
                    <SidebarMenuItem key={link.name}>
                        <SidebarMenuButton asChild isActive={pathname === link.href}>
                            <Link href={link.href}>
                                <link.icon className="h-4 w-4"/>
                                <span>{link.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </>
    );
}