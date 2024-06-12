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

export default function MainSlider() {
    return <section className="main-slider">
        <CustomOwlCarousel className="main-slider-swiper owl-carousel owl-theme" loop nav items={1} dots={false} autoplay navText={['<i class="fa-solid fa-arrow-left-long"></i>','<i class="fa-solid fa-arrow-right-long"></i>']}>
        <div className="item">
            <div className="item-slider-bg" style={{ backgroundImage: "url(/image/bg/ngasem1.png)" }}></div>
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                <div className="slider-content">
                    <div className="slider-tagline">Pelayanan Online Padukuhan Ngasem</div>
                    <h1 className="section-title">Eksplorasi & Kenali <br /> Padukuhan Ngasem</h1>
                    <a href="index-3.html" className="btn btn-primary">Lihat Lebih Lanjut</a>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="item">
            <div className="item-slider-bg" style={{ backgroundImage: "url(/image/bg/ngasem2.png)" }}></div>
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                <div className="slider-content">
                    <div className="slider-tagline">Media Informasi Padukuhan Ngasem</div>
                    <h1 className="section-title">Informasi Terkini <br /> Padukuhan Ngasem</h1>
                    <a href="index-3.html" className="btn btn-primary">Lihat Lebih Lanjut</a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </CustomOwlCarousel>
    </section>
}