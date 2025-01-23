'use client';
import {useSidebar} from "@/components/ui/sidebar";
import React from "react";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import AcmeLogo from "@/app/ui/acme-logo";

export function CustomTrigger() {
    const {toggleSidebar, open, isMobile} = useSidebar();

    return <>
        {
            isMobile && (
                <div className="flex justify-between items-center bg-blue-500 p-2 rounded-md mb-4 text-white">
                    <AcmeLogo/>
                    <Button variant="outline" size="icon" onClick={toggleSidebar} className="text-lg text-black">
                        {open ? <Menu/> : <X/>}
                    </Button>
                </div>
            )
        }

    </>

}