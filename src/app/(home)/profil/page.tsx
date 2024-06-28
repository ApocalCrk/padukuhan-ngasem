import React from 'react';
import type { Metadata } from 'next';
import About from '@/components/home/profil-wrapper/about';
import Team from '@/components/home/profil-wrapper/team';

export const metadata: Metadata = {
    title: "Profil | Eksplorasi Padukuhan Ngasem",
};

export default function Profil() {
  return (
    <div className="page-wrapper">
      <About />
      <Team />
    </div>
  );
}