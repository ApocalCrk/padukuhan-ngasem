"use client";
import React, { useState, useEffect } from "react";
import { Manrope } from "next/font/google";
import "@/styles/style.css";

import Loader from "@/components/administrator/common/Loader";

const manrope = Manrope({
  subsets: ["latin"],
});

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <head>
      <link rel="apple-touch-icon" sizes="57x57" href="/image/favico/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/image/favico/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/image/favico/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/image/favico/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/image/favico/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/image/favico/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/image/favico/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/image/favico/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="image/favico/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/image/favico/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/image/favico/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/image/favico/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/image/favico/favicon-16x16.png"/>
        <link rel="manifest" href="/image/favico/manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/image/favico/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/>
        <title>Administrator | Padukuhan Ngasem</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={manrope.className} suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
