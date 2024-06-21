import React from 'react';
import { Metadata } from 'next';
import BannerTop from '@/components/home/external/banner-top';
import DetailBerita from '@/components/home/berita-wrapper/detail-berita';

export const metadata: Metadata = {
    title: "Detail Berita & Artikel | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};


export default function BeritaDetail({params} : {params: {id: string}}) {
    const { id } = params;
    return (
        <div className="page-wrapper">
            <DetailBerita id={id} />
        </div>
    );
}