import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';
import {Metadata} from 'next';
import {Analytics} from "@vercel/analytics/next"
import React from "react";
import {SpeedInsights} from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    title: {
        template: '%s | Acme Dashboard',
        default: 'Acme Dashboard',
    },
    description: 'The official Next.js Course Dashboard, built with App Router.',
    metadataBase: new URL('https://next-dashboard-0125.vercel.app'),
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics/>
        <SpeedInsights/>
        </body>
        </html>
    );
}
