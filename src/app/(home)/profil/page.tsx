import React from 'react';
import type { Metadata } from 'next';
import About from '@/components/home/profil-wrapper/about';
import BannerTop from '@/components/home/external/banner-top';
import Team from '@/components/home/profil-wrapper/team';
import BannerBot from '@/components/home/profil-wrapper/banner-bot';

export const metadata: Metadata = {
    title: "Profil | Eksplorasi Padukuhan Ngasem",
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