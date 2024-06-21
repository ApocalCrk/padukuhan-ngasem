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
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className={manrope.className} suppressHydrationWarning={true}>
        <main>
          {!isMounted && (
            <div id="pre-loader">
              <div id="loader-logo"></div>
              <div id="loader-circle"></div>
              <div className="loader-section section-left"></div>
              <div className="loader-section section-right"></div>
            </div>
          )}

          <Header handleToggle={handleToggle} />

          {children}

          <Footer />

          <Sidebar isExpanded={isExpanded} handleToggle={handleToggle} />
          
          <BackToTop />
        </main>
      </body>
    </html>
  );
}
