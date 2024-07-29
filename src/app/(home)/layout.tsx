"use client";
import React, { useState, useEffect } from "react";
import { Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/flaticon/css/flaticon.css";
import "@/styles/font-awesome/css/all.min.css";
import "@/styles/globals.css";

import Header from '@/components/home/header';
import Footer from '@/components/home/footer';
import Sidebar from "@/components/home/sidebar";
import BackToTop from "@/components/home/external/back-to-top";

const manrope = Manrope({
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleToggle() {
    setIsExpanded(!isExpanded);
    document.body.classList.toggle('locked');
    var menu_content = $('.main-menu .navigation ul')[0].outerHTML;
    $('.mobile-nav-container').html(menu_content);
    $('.mobile-nav-container .main-menu-list li.has-dropdown > a').append('<button><i class="fa-solid fa-chevron-right"></i></button>');
    $('.mobile-nav-container .main-menu-list li.has-dropdown > a button').on('click', function() {
      $(this).toggleClass('expanded');
      $(this).parents('a').siblings('ul').slideToggle();
    });
  }

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
      </head>
      <body className={manrope.className} suppressHydrationWarning={true}>
        <main>

          <Header handleToggle={handleToggle} />

          {children}

          <Footer />

          <Sidebar isExpanded={isExpanded} handleToggle={handleToggle} />
        </main>
      </body>
    </html>
  );
}
