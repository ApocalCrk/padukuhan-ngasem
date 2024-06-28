'use client';
import React, { useEffect, useState } from 'react';
import { Introduksi } from '@/types/introduksi';
import useIntroduksi from '@/hooks/identity/useIntroduksi';

export default function About() {
  const { getIntroduksi } = useIntroduksi();
  const [introduksi, setIntroduksi] = useState<Introduksi>();

  useEffect(() => {
    getIntroduksi().then((data) => {
      setIntroduksi(data);
    });
  }, []);
  
  return (
    <section className="about-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="about-image">
              <div className="about-image-inner img-one">
                <img src={introduksi?.gambar1} className="img-fluid" alt="img-2" style={{
                  width: '300px',
                  height: '562px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }} />
              </div>
              <div className="about-image-inner img-two">
                <img src="/image/shapes/about-3.jpg" className="floated-image" alt="img-3"/>
                <img src={introduksi?.gambar2} className="img-fluid" alt="img-4" style={{
                  width: '240px',
                  height: '566px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-inner">
              <div className="section-title-box">
                <div className="section-tagline">{introduksi?.tagline}</div>
                <h2 className="section-title">{introduksi?.judul}</h2>
                <p dangerouslySetInnerHTML={{__html: introduksi?.konten || '' }}></p>
              </div>
              <div className="row">
                { introduksi?.sorotan.map((item, index) => (
                  <div className="col-xl-6 col-lg-12 col-md-6" key={index}>
                    <div className="about-card">
                      <h4 className="about-title"><i className="fa-solid fa-circle-check"></i>{item.judul}</h4>
                      <p className="about-text" style={{fontSize: '14px'}}>
                        {item.isi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}