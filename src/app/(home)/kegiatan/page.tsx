import React from 'react';
import { Metadata } from 'next';
import BannerTop from '@/components/home/external/banner-top';
import KegiatanSec from '@/components/home/kegiatan-wrapper/kegiatan-sec';

export const metadata: Metadata = {
    title: "Kegiatan | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Kegiatan() {
    return (
        <div className="page-wrapper">
            <BannerTop breadcrumb="Kegiatan" title="Kegiatan Padukuhan Ngasem" />
            <KegiatanSec />
        </div>
    );
}