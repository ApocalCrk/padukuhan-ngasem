'use client';
import React from 'react';
import { useProfil } from '@/hooks/pages/fetch-profil';
import { Profil } from '@/types/profil';

export default function Team() {
  const profil: Profil | null = useProfil();
  return (
    <section className="team-section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
            <div className="team-inner">
              <div className="section-tagline">Pengurus Padukuhan Ngasem</div>
              <h2 className="section-title">Bertemu dengan Pengurus Padukuhan Ngasem</h2>
            </div>
          </div>
        </div>
        <div className="row row-gutter-y-30">
          { profil?.pengurus.map((pengurus, index) => (
            <div className="col-12 col-md-6 col-xl-3" key={index}>
              <div className="team-card">
                <div className="team-card-content">
                  <h4><a href="team-details.html">{pengurus.nama}</a></h4>
                  <p>{pengurus.posisi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}