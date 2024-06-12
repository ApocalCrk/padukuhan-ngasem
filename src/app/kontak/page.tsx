import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BannerTop from '@/components/external/banner-top';
import BannerBot from '@/components/kontak-wrapper/banner-bot';
import Contact from '@/components/kontak-wrapper/contact';
import Gmap from '@/components/kontak-wrapper/gmap';

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