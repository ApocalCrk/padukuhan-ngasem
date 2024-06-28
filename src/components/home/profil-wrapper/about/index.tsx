'use client';
import React from 'react';
import useProfil from '@/hooks/pages/useProfil';
import { Profil } from '@/types/profil';

export default function About() {
  const { getProfil } = useProfil();
  
  const [profil, setProfil] = React.useState<Profil>();

  React.useEffect(() => {
    const fetchProfil = async () => {
      const data = await getProfil();
      setProfil(data);
    }

    fetchProfil();
  }, []);

  return (
    <section className="about-one-section">
      <div className="container">
        <div className="row row-gutter-y-40">
          <div className="col-lg-12 col-xl-6">
            <div className="about-one-inner">
              <div className="section-tagline">
                Tentang Padukuhan
              </div>
              <h2 className="section-title">{profil?.judul}</h2>
                <p dangerouslySetInnerHTML={{__html: profil?.konten || ''}} className='event-details-content'></p>
                <h5 className="about-one-inner-text">
                  {profil?.subjudul}
                </h5>
              <div className="row row-gutter-y-30">
                { profil?.visi_misi.map((visi, index) => (
                  <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                    <div className="about-one-card">
                      <div className="about-one-card-number">{index + 1}</div>
                      <div className="about-one-card-content"><h5>{visi}</h5></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-xl-6">
            <div className="about-one-image">
              <img src={profil?.image} alt="img-59" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}