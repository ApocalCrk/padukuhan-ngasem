import React from 'react';
import { Metadata } from 'next';
import BannerTop from '@/components/home/external/banner-top';
import BeritaSec from '@/components/home/berita-wrapper/berita-sec';

export const metadata: Metadata = {
    title: "Berita & Artikel | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Berita() {
    return (
        <div className="page-wrapper">
            <BannerTop breadcrumb="Berita & Artikel" title="Berita & Artikel" />
            <BeritaSec />
        </div>
    );
}