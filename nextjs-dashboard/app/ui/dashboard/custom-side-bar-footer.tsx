import React from 'react';
import {auth, signOut} from "@/auth";
import {SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";

const CustomSideBarFooter = async () => {
    const session = await auth();
    const username = session?.user?.name || session?.user?.email;
    const userImage = session?.user?.image || '';

    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <SidebarMenu>
                <SidebarMenuItem className="flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <Avatar>
                            <AvatarImage src={userImage} alt="@shadcn"/>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <span className="mr-2 text-sm">{username}</span>
                    </div>

                    <Button variant="secondary">
                        <LogOut className="h-4 w-4"/>
                        Sign Out
                    </Button>

                </SidebarMenuItem>
            </SidebarMenu>
        </form>
    );
};

export default CustomSideBarFooter;