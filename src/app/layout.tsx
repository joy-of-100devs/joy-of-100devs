import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import React from "react";
import ThemeConfigServerProvider from "@/components/ThemeConfigServerProvider";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'The Joy of #100Devs',
    description: 'An open-source course platform that brings extra joy to your #100Devs learning experience.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ThemeConfigServerProvider lang="en">
            <body className={inter.className}>{children}</body>
        </ThemeConfigServerProvider>
    );
}
