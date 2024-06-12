import React from 'react';
import type { Metadata } from 'next';
import About from '@/components/profil-wrapper/about';
import BannerTop from '@/components/external/banner-top';
import Team from '@/components/profil-wrapper/team';
import BannerBot from '@/components/profil-wrapper/banner-bot';

export const metadata: Metadata = {
    title: "Profil | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Profil() {
  return (
    <div className="page-wrapper">
      <BannerTop breadcrumb="Profil" title="Profil Padukuhan Ngasem" />
      <About />
      <Team />
      <BannerBot />
    </div>
  );
}