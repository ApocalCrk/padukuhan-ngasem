"use client";
import React, { useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MainSlider from '@/components/home-wrapper/slider';
import Portfolio from '@/components/home-wrapper/portfolio';
import ProfileLead from '@/components/home-wrapper/profile-lead';
import Department from '@/components/home-wrapper/department';
import About from '@/components/home-wrapper/about';
import Service from '@/components/home-wrapper/service';
import EventBlog from '@/components/home-wrapper/doc';
import Funcfact from '@/components/home-wrapper/funfact';

export default function Home() {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  return (
    <main>
      { !isMounted && (
        <div id="pre-loader">
          <div id="loader-logo"></div>
          <div id="loader-circle"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>
      )}

      <Header />

      <div className="page-wrapper">
        <MainSlider />
        <Department />
        <About />
        <Service />
        <Funcfact />
        <ProfileLead />
        <Portfolio />
        <EventBlog />
      </div>

      <Footer />
      
      <div className="mobile-nav-wrapper">
        <div className="mobile-nav-overlay mobile-nav-toggler"></div>
        <div className="mobile-nav-content">
          <a href="#" className="mobile-nav-close mobile-nav-toggler">
            <span></span>
            <span></span>
          </a>
          <div className="logo-box">
            <a href="index-2.html"><img src="/image/logo-light.png" width="160" height="40" alt="26"/></a>
          </div>
          <div className="mobile-nav-container"></div>
          <ul className="mobile-nav-contact list-unstyled">
            <li>
              <i className="fa-solid fa-phone"></i>
              <a href="tel:+8898006802">+ 88 ( 9800 ) 6802</a>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:needhelp@company.com">needhelp@company.com</a>
            </li>
            <li>
              <i className="fa-solid fa-map-marker-alt"></i>
              88 Broklyn Golden Road Street <br/> New York. USA
            </li>
          </ul>
          <ul className="mobile-nav-social list-unstyled">
            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      
      <div className="search-popup">
        <div className="search-popup-overlay search-toggler"></div>
        <div className="search-popup-content">
          <form action="#">
            <label htmlFor="search" className="sr-only">search here</label>
            <input type="text" id="search" placeholder="Search Here..."/>
            <button type="submit" aria-label="search submit" className="search-btn">
              <span><i className="flaticon-search-interface-symbol"></i></span>
            </button>
          </form>
        </div>
      </div>

	    <a href="#" className="scroll-to-top scroll-to-target" data-target="html"><i className="fa-solid fa-arrow-up"></i></a>
    </main>
    )
}
