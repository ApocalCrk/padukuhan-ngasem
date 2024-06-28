"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import useGaleri from '@/hooks/identity/useGaleri';
import { Galeri } from '@/types/galeri';

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const CustomOwlCarousel = ({ children, ...props }: any) => {
  useEffect(() => {}, [props]);

  return <OwlCarousel {...props}>{children}</OwlCarousel>;
};

export default function Portfolio() {
  const { getAllGaleri } = useGaleri();
  const [galeri, setGaleri] = useState<Galeri[]>([]);

  useEffect(() => {
    getAllGaleri().then((data) => {
      setGaleri(data);
    });
  }, []);


  return (
    <section className="portfolio-section">
      <div className="section-title-box text-center">
        <div className="section-tagline">Galeri Padukuhan Ngasem</div>
        <h2 className="section-title">
          Jelajahi Sorotan Di <br />
          Padukuhan Ngasem
        </h2>
      </div>
      <div className="portfolio-content conatainer-fluid" style={{ height: '100%' }}>
        { galeri.length > 0 ? (
          <CustomOwlCarousel
            className="portfolio-carousel owl-carousel owl-theme"
            loop
            nav={false}
            margin={30}
            items={4}
            autoplay
            smartSpeed={1000}
            dots={false}
            responsive={{
              0: { items: 1 },
              575: { items: 2 },
              767: { items: 3 },
              991: { items: 4 },
            }}
          >
            {galeri.map((item, index) => (
              <div className="item" key={index}>
                <div className="portfolio-card">
                  <img
                    src={item.gambar}
                    className="img-fluid"
                    alt={`img-${index}`}
                    style={{
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '10px'
                    }}
                  />
                  <div className="portfolio-card-meta">
                    <div className="portfolio-card-text">
                      <span>{item.tempat}</span>
                    </div>
                    <div className="portfolio-card-title">
                      <span>{item.nama_tempat}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CustomOwlCarousel>
        ) : (
          <div className="text-center">
            <p>Galeri Kosong</p>
          </div>
        )}
      </div>
    </section>
  );
}
