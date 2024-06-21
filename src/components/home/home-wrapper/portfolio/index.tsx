"use client";
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const CustomOwlCarousel = ({ children, ...props }: any) => { 
  useEffect(() => {
    
  }, [props]); 

  return <OwlCarousel {...props}>{children}</OwlCarousel>;
};

export default function Portfolio() {
    return (
        <section className="portfolio-section">
            <div className="section-title-box text-center">
            <div className="section-tagline">recent work portfolio</div>
            <h2 className="section-title">Explore City Highlights <br/>Portfolios</h2>
            </div>
            <div className="portfolio-content conatainer-fluid">
            <CustomOwlCarousel className="portfolio-carousel owl-carousel owl-theme" loop nav={false} margin={30} items={4} autoplay smartSpeed={1000} dots={false} responsive={{ 0: { items: 1 }, 575: { items: 2 }, 767: { items: 3 }, 991: { items: 4 } }}>
                <div className="item">
                <div className="portfolio-card">
                    <img src="/image/portfolio/portfolio-1.jpg" className="img-fluid" alt="img-9"/>
                    <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Places</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html">Broadway Road</a>
                    </div>
                    </div>
                </div>
                </div>
                <div className="item">
                <div className="portfolio-card">
                    <img src="/image/portfolio/portfolio-2.jpg" className="img-fluid" alt="img-10"/>
                    <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Intercity</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html"> Grand Central
                        Terminal</a></div>
                    </div>
                </div>
                </div>
                <div className="item">
                <div className="portfolio-card">
                    <img src="/image/portfolio/portfolio-3.jpg" className="img-fluid" alt="img-11"/>
                    <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Business</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html">Empire State
                        Building</a></div>
                    </div>
                </div>
                </div>
                <div className="item">
                <div className="portfolio-card">
                    <img src="/image/portfolio/portfolio-4.jpg" className="img-fluid" alt="img-12"/>
                    <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Travel</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html">Fulton Center</a>
                    </div>
                    </div>
                </div>
                </div>
            </CustomOwlCarousel>
            </div>
        </section>
    );
}
