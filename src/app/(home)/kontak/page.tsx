import React from 'react';
import type { Metadata } from 'next';
import BannerTop from '@/components/home/external/banner-top';
import BannerBot from '@/components/home/kontak-wrapper/banner-bot';
import Contact from '@/components/home/kontak-wrapper/contact';
import Gmap from '@/components/home/kontak-wrapper/gmap';

export const metadata: Metadata = {
    title: "Kontak | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Profil() {
  return (
    <div className="page-wrapper">
        <BannerTop breadcrumb="Kontak" title="Kontak Padukuhan Ngasem" />
        <Contact />
        <Gmap />
        <BannerBot />
    </div>
  );
}